/**
 * UserManagement.jsx
 * Super Admin – Full member management panel.
 * Features: list all users, create staff, block / suspend / activate, set password, delete.
 */
import { useEffect, useState, useCallback } from "react";
import {
  Users,
  UserPlus,
  Search,
  ShieldOff,
  ShieldCheck,
  Clock,
  Trash2,
  KeyRound,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  EyeOff,
  Filter
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import { apiRequest } from "../../services/api.js";

/* ─────────────────────── helpers ─────────────────────── */
const BASE = "/api/admin/users";

const STATUS_STYLES = {
  ACTIVE:     "bg-emerald-950/60 text-emerald-300",
  BLOCKED:    "bg-red-950/60    text-red-300",
  SUSPENDED:  "bg-amber-950/60  text-amber-300",
  INACTIVE:   "bg-zinc-800      text-zinc-400",
  UNVERIFIED: "bg-blue-950/60   text-blue-300"
};

const ROLE_STYLES = {
  ADMIN:       "bg-purple-950/60 text-purple-300",
  HR:          "bg-cyan-950/60   text-cyan-300",
  DISTRIBUTOR: "bg-gold/10       text-gold"
};

function Badge({ text, styles }) {
  return (
    <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${styles}`}>{text}</span>
  );
}

/* ─────────────────────── modal scaffold ─────────────────────── */
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md border border-white/10 bg-[#171714] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="serif text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-[#888] hover:text-white transition">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────── Create User Modal ─────────────────────── */
function CreateUserModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "HR", companyName: "", phone: "" });
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      await apiRequest(BASE, { method: "POST", body: JSON.stringify(form) });
      onCreated();
      onClose();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title="Create New Member Account" onClose={onClose}>
      <form onSubmit={submit} className="grid gap-4 text-xs">
        <div>
          <label className="text-[11px] text-[#aaa]">Full Name *</label>
          <input required className="field mt-1 w-full" placeholder="e.g. Ramesh Kumar"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="text-[11px] text-[#aaa]">Work Email *</label>
          <input required type="email" className="field mt-1 w-full" placeholder="name@indiraindustries.co.in"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="text-[11px] text-[#aaa]">Role *</label>
          <select className="field mt-1 w-full" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="HR">HR</option>
            <option value="ADMIN">Admin</option>
            <option value="DISTRIBUTOR">Distributor</option>
          </select>
        </div>

        {form.role === "DISTRIBUTOR" && (
          <div className="grid gap-3 sm:grid-cols-2 rounded border border-gold/20 bg-gold/5 p-3">
            <div>
              <label className="text-[11px] text-[#aaa]">Company / Business Name</label>
              <input className="field mt-1 w-full" placeholder="e.g. Acme Petroleum Ltd"
                value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
            </div>
            <div>
              <label className="text-[11px] text-[#aaa]">Contact Phone</label>
              <input type="tel" className="field mt-1 w-full" placeholder="+91 98765 43210"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
        )}

        <div>
          <label className="text-[11px] text-[#aaa]">Initial Password * (min 8 chars)</label>
          <div className="relative mt-1">
            <input required type={showPw ? "text" : "password"} minLength={8} className="field w-full pr-9"
              placeholder="Set a strong password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] hover:text-white"
              onClick={() => setShowPw(s => !s)}>
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        {err && <p role="alert" className="text-red-300">{err}</p>}
        <button disabled={busy} className="gold-button mt-1 w-full justify-center">
          {busy ? "Creating…" : "Create Account"}
        </button>
      </form>
    </Modal>
  );
}

/* ─────────────────────── Set Password Modal ─────────────────────── */
function SetPasswordModal({ user, onClose, onDone }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      await apiRequest(`${BASE}/${user._id}/password`, { method: "PATCH", body: JSON.stringify({ password }) });
      onDone(`Password updated for ${user.name}. They can now log in with the new password.`);
      onClose();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title={`Set Password — ${user.name}`} onClose={onClose}>
      <p className="mb-4 text-xs text-[#aaa59b]">
        Set a new password for <strong className="text-white">{user.email}</strong>. All existing sessions will be invalidated.
      </p>
      <form onSubmit={submit} className="grid gap-4 text-xs">
        <div>
          <label className="text-[11px] text-[#aaa]">New Password * (min 8 chars)</label>
          <div className="relative mt-1">
            <input required type={showPw ? "text" : "password"} minLength={8} className="field w-full pr-9"
              placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] hover:text-white"
              onClick={() => setShowPw(s => !s)}>
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        {err && <p role="alert" className="text-red-300">{err}</p>}
        <button disabled={busy} className="gold-button mt-1 w-full justify-center">
          {busy ? "Updating…" : "Set Password"}
        </button>
      </form>
    </Modal>
  );
}

/* ─────────────────────── Confirm Modal ─────────────────────── */
function ConfirmModal({ title, description, confirmLabel, danger, onConfirm, onClose, busy }) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="mb-6 text-sm text-[#aaa59b]">{description}</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border border-white/15 py-2 text-xs text-[#aaa] hover:text-white transition">
          Cancel
        </button>
        <button disabled={busy} onClick={onConfirm}
          className={`flex-1 py-2 text-xs font-semibold transition ${danger ? "bg-red-700 hover:bg-red-600 text-white" : "gold-button justify-center"}`}>
          {busy ? "Processing…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

/* ─────────────────────── Main Component ─────────────────────── */
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [setPwUser, setSetPwUser] = useState(null);
  const [confirmOp, setConfirmOp] = useState(null); // { action, user }
  const [confirmBusy, setConfirmBusy] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      if (statusFilter) params.set("status", statusFilter);
      const r = await apiRequest(`${BASE}?${params}`);
      setUsers(r.data);
      setPagination(r.pagination);
    } catch (ex) {
      setError(ex.message);
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, page]);

  useEffect(() => { load(); }, [load]);

  /* ── Status action (block / suspend / activate) ── */
  async function executeConfirm() {
    if (!confirmOp) return;
    setConfirmBusy(true);
    try {
      if (confirmOp.action === "DELETE") {
        await apiRequest(`${BASE}/${confirmOp.user._id}`, { method: "DELETE" });
        showToast(`${confirmOp.user.name} has been permanently removed.`);
      } else {
        await apiRequest(`${BASE}/${confirmOp.user._id}/status`, {
          method: "PATCH",
          body: JSON.stringify({ action: confirmOp.action })
        });
        showToast(`User ${confirmOp.action.toLowerCase()}d successfully.`);
      }
      setConfirmOp(null);
      load();
    } catch (ex) {
      showToast(`Error: ${ex.message}`);
      setConfirmOp(null);
    } finally {
      setConfirmBusy(false);
    }
  }

  /* ── Row actions ── */
  const ActionBtn = ({ icon: Icon, label, onClick, color = "text-[#aaa] hover:text-white" }) => (
    <button title={label} onClick={onClick}
      className={`rounded p-1.5 transition ${color} hover:bg-white/5`}>
      <Icon size={14} />
    </button>
  );

  return (
    <>
      <SectionHeading
        eyebrow="SUPER ADMIN"
        title="User Management"
        description="Create, manage, block, suspend or remove HR, Admin and Distributor accounts. Set passwords directly."
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm border border-emerald-500/30 bg-emerald-950/90 px-4 py-3 text-xs text-emerald-300 shadow-xl">
          {toast}
        </div>
      )}

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
          <input
            className="field w-full pl-8 text-xs"
            placeholder="Search name or email…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* Role filter */}
        <select className="field text-xs" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="HR">HR</option>
          <option value="DISTRIBUTOR">Distributor</option>
        </select>

        {/* Status filter */}
        <select className="field text-xs" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        <button onClick={load} className="border border-white/15 p-2 text-[#aaa] hover:text-gold transition" title="Refresh">
          <RefreshCw size={14} />
        </button>

        {/* Create button */}
        <button onClick={() => setCreateOpen(true)}
          className="gold-button ml-auto flex items-center gap-2 text-xs">
          <UserPlus size={14} /> New Member
        </button>
      </div>

      {/* Stats bar */}
      <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-[#888]">
        <span>Total: <strong className="text-white">{pagination.total}</strong></span>
        <span>·</span>
        <span>Page <strong className="text-white">{pagination.page}</strong> of <strong className="text-white">{pagination.pages}</strong></span>
      </div>

      {/* Error */}
      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

      {/* Table */}
      <div className="mt-4 overflow-x-auto border border-white/10">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-[#171714] text-left text-[10px] tracking-wider text-[#888]">
              <th className="px-4 py-3">NAME / EMAIL</th>
              <th className="px-4 py-3">ROLE</th>
              <th className="px-4 py-3">STATUS</th>
              <th className="px-4 py-3">JOINED</th>
              <th className="px-4 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="py-10 text-center text-[#888]">Loading members…</td></tr>
            )}
            {!loading && users.length === 0 && (
              <tr><td colSpan={5} className="py-10 text-center text-[#888]">No users found.</td></tr>
            )}
            {!loading && users.map(u => (
              <tr key={u._id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                <td className="px-4 py-3">
                  <div className="font-semibold text-white">{u.name}</div>
                  <div className="mt-0.5 text-[#777]">{u.email}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge text={u.role} styles={ROLE_STYLES[u.role] || "bg-white/5 text-white"} />
                </td>
                <td className="px-4 py-3">
                  <Badge text={u.status} styles={STATUS_STYLES[u.status] || "bg-white/5 text-white"} />
                  {u.suspendedUntil && u.status === "SUSPENDED" && (
                    <div className="mt-1 text-[10px] text-amber-400">
                      Until {new Date(u.suspendedUntil).toLocaleDateString("en-IN")}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-[#888]">
                  {new Date(u.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {/* Set Password */}
                    <ActionBtn icon={KeyRound} label="Set Password"
                      color="text-[#aaa] hover:text-blue-300"
                      onClick={() => setSetPwUser(u)} />

                    {/* Activate (if not active) */}
                    {u.status !== "ACTIVE" && (
                      <ActionBtn icon={ShieldCheck} label="Activate"
                        color="text-[#aaa] hover:text-emerald-300"
                        onClick={() => setConfirmOp({ action: "ACTIVATE", user: u })} />
                    )}

                    {/* Suspend */}
                    {u.status === "ACTIVE" && (
                      <ActionBtn icon={Clock} label="Suspend (7 days)"
                        color="text-[#aaa] hover:text-amber-300"
                        onClick={() => setConfirmOp({ action: "SUSPEND", user: u })} />
                    )}

                    {/* Block */}
                    {u.status !== "BLOCKED" && (
                      <ActionBtn icon={ShieldOff} label="Block Account"
                        color="text-[#aaa] hover:text-red-300"
                        onClick={() => setConfirmOp({ action: "BLOCK", user: u })} />
                    )}

                    {/* Delete */}
                    <ActionBtn icon={Trash2} label="Delete Permanently"
                      color="text-[#aaa] hover:text-red-500"
                      onClick={() => setConfirmOp({ action: "DELETE", user: u })} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="border border-white/15 p-1.5 text-[#aaa] hover:text-white disabled:opacity-30 transition">
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs text-[#888]">Page {page} / {pagination.pages}</span>
          <button disabled={page === pagination.pages} onClick={() => setPage(p => p + 1)}
            className="border border-white/15 p-1.5 text-[#aaa] hover:text-white disabled:opacity-30 transition">
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* ── Modals ── */}
      {createOpen && (
        <CreateUserModal
          onClose={() => setCreateOpen(false)}
          onCreated={() => { load(); showToast("New member account created successfully."); }}
        />
      )}

      {setPwUser && (
        <SetPasswordModal
          user={setPwUser}
          onClose={() => setSetPwUser(null)}
          onDone={(msg) => { showToast(msg); }}
        />
      )}

      {confirmOp && (
        <ConfirmModal
          title={
            confirmOp.action === "BLOCK"    ? "Block Account" :
            confirmOp.action === "SUSPEND"  ? "Suspend Account" :
            confirmOp.action === "ACTIVATE" ? "Activate Account" :
            "Delete Account Permanently"
          }
          description={
            confirmOp.action === "BLOCK"
              ? `Block ${confirmOp.user.name} (${confirmOp.user.email})? They will be immediately signed out and cannot log in until reactivated.`
              : confirmOp.action === "SUSPEND"
              ? `Suspend ${confirmOp.user.name} for 7 days? They will be signed out immediately and cannot log in during the suspension period.`
              : confirmOp.action === "ACTIVATE"
              ? `Reactivate ${confirmOp.user.name}'s account? They will be able to log in again.`
              : `Permanently delete ${confirmOp.user.name} (${confirmOp.user.email})? This action cannot be undone. All their session tokens will be revoked.`
          }
          confirmLabel={
            confirmOp.action === "BLOCK"    ? "Block User" :
            confirmOp.action === "SUSPEND"  ? "Suspend User" :
            confirmOp.action === "ACTIVATE" ? "Activate User" :
            "Delete Permanently"
          }
          danger={confirmOp.action === "DELETE" || confirmOp.action === "BLOCK"}
          busy={confirmBusy}
          onConfirm={executeConfirm}
          onClose={() => setConfirmOp(null)}
        />
      )}
    </>
  );
}
