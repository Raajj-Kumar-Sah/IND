import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, UserPlus, Building2, CheckCircle2 } from "lucide-react";
import { authApi } from "../../services/api.js";
import { setSession } from "../../services/session.js";

export default function PortalLogin() {
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // Registration form fields
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    gstin: "",
    businessType: "DISTRIBUTOR",
    city: "",
    state: ""
  });

  const navigate = useNavigate();

  async function forgot() {
    if (!email.trim()) {
      setError("Please enter your email address to receive password reset instructions.");
      return;
    }
    setError("");
    setResetMessage("");
    try {
      const r = await authApi.forgotPassword(email);
      setResetMessage(r.message);
    } catch (e) {
      setError(e.message);
    }
  }

  async function login(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await authApi.login(email, password);
      setSession(r.data);
      const role = r.data.user.role;
      navigate(
        role === "HR"
          ? "/dashboard/hr"
          : role === "DISTRIBUTOR"
          ? "/dashboard/distributor"
          : "/dashboard/admin",
        { replace: true }
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function register(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setRegSuccess("");
    try {
      const payload = {
        name: regForm.name,
        email: regForm.email,
        password: regForm.password,
        companyName: regForm.companyName,
        contactPerson: regForm.contactPerson || regForm.name,
        phone: regForm.phone,
        gstin: regForm.gstin,
        businessType: regForm.businessType,
        address: {
          city: regForm.city,
          state: regForm.state,
          country: "India"
        }
      };
      const res = await authApi.registerDistributor(payload);
      setRegSuccess(res.message || "Registration submitted! Please verify your email.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container min-h-[75vh] py-8 sm:py-16">
      <Link to="/" className="text-xs text-gold">
        ← BACK TO WEBSITE
      </Link>

      <div className="mx-auto mt-6 sm:mt-8 max-w-lg border border-white/10 bg-[#171714] p-5 sm:p-8 shadow-2xl">
        <div className="eyebrow">ENTERPRISE PORTAL ACCESS</div>
        <h1 className="serif mt-1 text-2xl sm:text-3xl font-bold">Indira Industries Workspace</h1>

        {/* Tab selection */}
        <div className="mt-6 flex border-b border-white/10">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setError("");
            }}
            className={`flex-1 pb-3 text-xs font-semibold tracking-wider transition ${
              tab === "login"
                ? "border-b-2 border-gold text-gold"
                : "text-[#888] hover:text-white"
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setError("");
            }}
            className={`flex-1 pb-3 text-xs font-semibold tracking-wider transition ${
              tab === "register"
                ? "border-b-2 border-gold text-gold"
                : "text-[#888] hover:text-white"
            }`}
          >
            BECOME A DISTRIBUTOR
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={login} className="mt-6 grid gap-4">
            <p className="text-xs leading-5 text-[#aaa59b]">
              Sign in with your authorized email address. Your role automatically opens the Admin, HR, or Distributor workspace.
            </p>

            <div>
              <label className="text-[11px] text-[#aaa]">Work Email</label>
              <input
                className="field mt-1.5 w-full"
                type="email"
                required
                autoComplete="username"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[11px] text-[#aaa]">Password</label>
              <input
                className="field mt-1.5 w-full"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={forgot}
                className="text-[11px] text-gold underline hover:text-white"
              >
                Forgot password?
              </button>
            </div>

            <button disabled={busy} className="gold-button mt-2 w-full justify-center">
              {busy ? "Authenticating..." : "Sign in to Portal"}
            </button>

            {resetMessage && <p className="text-xs text-emerald-300">{resetMessage}</p>}
            {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
          </form>
        ) : (
          <div className="mt-6">
            {regSuccess ? (
              <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-5 text-center">
                <CheckCircle2 className="mx-auto text-emerald-400" size={36} />
                <h3 className="serif mt-3 text-xl font-bold">Registration Submitted</h3>
                <p className="mt-2 text-xs leading-6 text-[#ccc]">{regSuccess}</p>
                <button
                  type="button"
                  onClick={() => {
                    setTab("login");
                    setRegSuccess("");
                  }}
                  className="gold-button mt-5 inline-flex text-xs"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={register} className="grid gap-3.5 text-xs">
                <p className="text-xs leading-5 text-[#aaa59b]">
                  Register your business entity to access commercial catalogue pricing, place bulk orders, and receive distributor credit lines.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Company Name *</label>
                    <input
                      required
                      className="field mt-1 w-full"
                      placeholder="e.g. Acme Petroleum Ltd"
                      value={regForm.companyName}
                      onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">GSTIN (15 chars)</label>
                    <input
                      className="field mt-1 w-full uppercase"
                      maxLength={15}
                      placeholder="27AAAAA0000A1Z5"
                      value={regForm.gstin}
                      onChange={(e) => setRegForm({ ...regForm, gstin: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Primary Contact Name *</label>
                    <input
                      required
                      className="field mt-1 w-full"
                      placeholder="Full Name"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">Business Phone *</label>
                    <input
                      required
                      type="tel"
                      className="field mt-1 w-full"
                      placeholder="+91 98765 43210"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#aaa]">Official Business Email *</label>
                  <input
                    required
                    type="email"
                    className="field mt-1 w-full"
                    placeholder="distributor@company.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#aaa]">Account Password (min 8 chars) *</label>
                  <input
                    required
                    type="password"
                    minLength={8}
                    className="field mt-1 w-full"
                    placeholder="Create a strong password"
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Business Type</label>
                    <select
                      className="field mt-1 w-full"
                      value={regForm.businessType}
                      onChange={(e) => setRegForm({ ...regForm, businessType: e.target.value })}
                    >
                      <option value="DISTRIBUTOR">Distributor</option>
                      <option value="WHOLESALER">Wholesaler</option>
                      <option value="DEALER">Dealer</option>
                      <option value="RETAILER">Retailer</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">City</label>
                    <input
                      className="field mt-1 w-full"
                      placeholder="e.g. Mumbai"
                      value={regForm.city}
                      onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">State</label>
                    <input
                      className="field mt-1 w-full"
                      placeholder="e.g. Maharashtra"
                      value={regForm.state}
                      onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                    />
                  </div>
                </div>

                {error && <p role="alert" className="mt-2 text-xs text-red-300">{error}</p>}

                <button disabled={busy} className="gold-button mt-3 w-full justify-center">
                  {busy ? "Submitting Application..." : "Submit Distributor Application"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
