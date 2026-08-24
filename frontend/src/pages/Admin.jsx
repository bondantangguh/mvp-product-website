import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API } from "@/config";
import { Check, X, Search, LogOut, RefreshCw } from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-court-focus/15 text-court-focus border-court-focus/40",
  approved: "bg-court-win/15 text-court-win border-court-win/40",
  rejected: "bg-court-warn/15 text-court-warn border-court-warn/40",
  expired: "bg-white/10 text-white/50 border-white/20",
};

const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—");

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("mvp_admin_token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState(null);
  const [search, setSearch] = useState("");

  const authHeader = { Authorization: `Bearer ${token}` };

  const load = useCallback(
    async (q = "") => {
      try {
        const { data } = await axios.get(`${API}/admin/applicants`, {
          headers: authHeader,
          params: q ? { search: q } : {},
        });
        setApplicants(data.applicants);
      } catch (e) {
        if (e.response?.status === 401) {
          localStorage.removeItem("mvp_admin_token");
          setToken("");
        } else {
          toast.error("Failed to load applicants");
        }
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem("mvp_admin_token", data.token);
      setToken(data.token);
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const act = async (id, action, body) => {
    try {
      await axios.post(`${API}/admin/applicants/${id}/${action}`, body, { headers: authHeader });
      toast.success(action === "approve" ? "Tester approved — 1 month window set" : "Status updated");
      load(search);
    } catch {
      toast.error("Action failed");
    }
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-navy grain flex items-center justify-center px-5" data-testid="admin-login-page">
        <form onSubmit={login} className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl" data-testid="admin-login-form">
          <p className="font-display font-black text-2xl text-navy brand-split-sm">MVP ADMIN</p>
          <p className="mt-1 text-sm text-navy/50">Beta tester management</p>
          <label htmlFor="admin-email" className="block mt-6 font-mono2 text-[10px] tracking-[0.25em] text-navy/50 uppercase mb-2">Email</label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="admin-email-input"
            className="w-full rounded-xl border-2 border-navy/15 px-4 py-3 text-navy focus:border-court-cyan focus:outline-none transition-colors"
          />
          <label htmlFor="admin-password" className="block mt-4 font-mono2 text-[10px] tracking-[0.25em] text-navy/50 uppercase mb-2">Password</label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="admin-password-input"
            className="w-full rounded-xl border-2 border-navy/15 px-4 py-3 text-navy focus:border-court-cyan focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="mt-6 w-full rounded-full bg-navy py-3.5 font-display font-black text-sm tracking-widest text-white hover:bg-court-pink transition-colors disabled:opacity-60"
          >
            {loading ? "SIGNING IN…" : "SIGN IN"}
          </button>
          <a href="/" data-testid="admin-back-link" className="mt-4 block text-center text-xs text-navy/40 hover:text-navy">
            ← Back to site
          </a>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy grain py-10 px-5 sm:px-8" data-testid="admin-dashboard">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display font-black text-3xl text-white brand-split-sm">MVP ADMIN</p>
            <p className="text-sm text-white/50">Beta applicants{applicants ? ` · ${applicants.length}` : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(search)}
              data-testid="admin-refresh-btn"
              className="rounded-full border border-white/20 p-2.5 text-white/70 hover:text-court-cyan hover:border-court-cyan transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => { localStorage.removeItem("mvp_admin_token"); setToken(""); }}
              data-testid="admin-logout-btn"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white/70 hover:text-court-pink hover:border-court-pink transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); load(search); }}
          className="mt-8 flex gap-3"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email…"
              data-testid="admin-search-input"
              className="w-full rounded-full bg-white/5 border border-white/15 pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:border-court-cyan focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            data-testid="admin-search-btn"
            className="rounded-full bg-court-cyan px-6 font-display font-bold text-xs tracking-widest text-navy hover:bg-white transition-colors"
          >
            SEARCH
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-navy-2 overflow-hidden" data-testid="admin-applicants-table">
          {!applicants ? (
            <p className="p-10 text-center text-white/40 text-sm">Loading…</p>
          ) : applicants.length === 0 ? (
            <p className="p-10 text-center text-white/40 text-sm" data-testid="admin-empty-state">No applicants yet.</p>
          ) : (
            <div className="divide-y divide-white/5">
              {applicants.map((a) => (
                <div key={a.id} className="p-5 flex flex-col lg:flex-row lg:items-center gap-4" data-testid={`admin-applicant-${a.id}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold text-white truncate">{a.email}</p>
                    <p className="text-xs text-white/45 mt-0.5">
                      {a.name || "—"} · {a.role || "no role"} · signed up {fmt(a.signupDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`rounded-full border px-3 py-1 font-mono2 text-[10px] tracking-widest uppercase ${STATUS_STYLES[a.betaStatus] || STATUS_STYLES.pending}`} data-testid={`admin-status-${a.id}`}>
                      {a.betaStatus}
                    </span>
                    {a.betaStatus === "approved" && (
                      <span className="font-mono2 text-[10px] text-white/40">
                        {fmt(a.betaStartDate)} → {fmt(a.betaEndDate)}
                      </span>
                    )}
                    {a.betaStatus !== "approved" && (
                      <button
                        onClick={() => act(a.id, "approve")}
                        data-testid={`admin-approve-${a.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-court-win/15 border border-court-win/40 px-3.5 py-1.5 text-[11px] font-bold text-court-win hover:bg-court-win hover:text-navy transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}
                    {a.betaStatus !== "rejected" && (
                      <button
                        onClick={() => act(a.id, "status", { status: "rejected" })}
                        data-testid={`admin-reject-${a.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/15 px-3.5 py-1.5 text-[11px] font-bold text-white/50 hover:text-court-warn hover:border-court-warn/50 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
