from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import re
import uuid
import asyncio
import logging
import ipaddress
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone, timedelta
from typing import Optional, List

import jwt
import httpx
from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "MVP")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")

# ---------------- Email guardrail gate (G2/G3) ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Bad URL host: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text mismatch: {m.group(1)!r} vs {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Email send error: {e}")
        return None


# ---------------- Auth ----------------
security = HTTPBearer(auto_error=False)


def create_admin_token() -> str:
    payload = {
        "sub": ADMIN_EMAIL,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def require_admin(creds: HTTPAuthorizationCredentials = Depends(security)):
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("sub") != ADMIN_EMAIL or payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


class LoginInput(BaseModel):
    email: EmailStr
    password: str


@api_router.post("/auth/login")
async def login(input: LoginInput):
    email = input.email.lower().strip()
    if email != ADMIN_EMAIL.lower() or input.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_admin_token(), "email": ADMIN_EMAIL}


# ---------------- Beta signup ----------------
class BetaSignup(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    role: Optional[str] = None


ALLOWED_ROLES = {"player", "coach", "captain", "observer", "other"}


async def notify_owner(doc: dict):
    if not OWNER_EMAIL:
        return
    subject = f"New MVP Beta Tester: {doc['email']}"
    html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;'
        'font-family:Arial,sans-serif;color:#0B1226">'
        f'<h2 style="margin:0 0 12px">New Beta Tester Signup</h2>'
        f'<p><strong>Email:</strong> {escape(doc["email"])}</p>'
        f'<p><strong>Name:</strong> {escape(doc.get("name") or "—")}</p>'
        f'<p><strong>Role:</strong> {escape(doc.get("role") or "—")}</p>'
        f'<p><strong>Signed up:</strong> {escape(doc["signupDate"])}</p>'
        f'<p style="font-size:12px;color:#888">Sent by {escape(EMAIL_FROM_NAME)}.</p>'
        '</td></tr></table>'
    )
    await send_email(to=OWNER_EMAIL, subject=subject, html=html)


@api_router.post("/beta/signup")
async def beta_signup(input: BetaSignup):
    email = input.email.lower().strip()
    existing = await db.beta_testers.find_one({"email": email}, {"_id": 0})
    if existing:
        return {"status": "ok", "message": "already_registered"}
    role = (input.role or "").lower().strip()
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "name": (input.name or "").strip() or None,
        "role": role if role in ALLOWED_ROLES else None,
        "signupDate": datetime.now(timezone.utc).isoformat(),
        "betaStatus": "pending",
        "betaStartDate": None,
        "betaEndDate": None,
    }
    await db.beta_testers.insert_one(doc)
    doc.pop("_id", None)
    asyncio.create_task(notify_owner(doc))
    return {"status": "ok", "message": "registered"}


# ---------------- Admin beta management ----------------
def serialize(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


@api_router.get("/admin/applicants")
async def list_applicants(search: Optional[str] = None, admin=Depends(require_admin)):
    query = {}
    if search:
        query["email"] = {"$regex": re.escape(search.strip()), "$options": "i"}
    docs = await db.beta_testers.find(query, {"_id": 0}).sort("signupDate", -1).to_list(1000)
    return {"applicants": [serialize(d) for d in docs], "total": len(docs)}


@api_router.post("/admin/applicants/{app_id}/approve")
async def approve_applicant(app_id: str, admin=Depends(require_admin)):
    now = datetime.now(timezone.utc)
    end = now + timedelta(days=30)
    result = await db.beta_testers.update_one(
        {"id": app_id},
        {"$set": {"betaStatus": "approved", "betaStartDate": now.isoformat(), "betaEndDate": end.isoformat()}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Applicant not found")
    doc = await db.beta_testers.find_one({"id": app_id}, {"_id": 0})
    return {"applicant": serialize(doc)}


class StatusUpdate(BaseModel):
    status: str


@api_router.post("/admin/applicants/{app_id}/status")
async def set_status(app_id: str, input: StatusUpdate, admin=Depends(require_admin)):
    if input.status not in {"pending", "approved", "rejected", "expired"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.beta_testers.update_one({"id": app_id}, {"$set": {"betaStatus": input.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Applicant not found")
    doc = await db.beta_testers.find_one({"id": app_id}, {"_id": 0})
    return {"applicant": serialize(doc)}


@api_router.get("/")
async def root():
    return {"message": "MVP — Match Value Projection API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("startup")
async def startup():
    await db.beta_testers.create_index("email", unique=True)
    await db.beta_testers.create_index("id", unique=True)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
