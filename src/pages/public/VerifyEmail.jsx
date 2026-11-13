import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { authApi } from "../../services/api.js";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState(token ? "loading" : "missing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    authApi
      .verifyEmail(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.message || "Your email address has been verified successfully.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "The verification link is invalid or has expired.");
      });
  }, [token]);

  return (
    <main className="container min-h-[75vh] py-20">
      <Link to="/" className="text-xs text-gold">
        ← BACK TO HOME
      </Link>
      <div className="mx-auto mt-12 max-w-md border border-white/10 bg-[#171714] p-8 text-center shadow-xl">
        {status === "loading" && (
          <div>
            <div className="serif text-3xl">Verifying your email…</div>
            <p className="mt-3 text-xs text-[#aaa]">Please hold on while we confirm your security token.</p>
          </div>
        )}

        {status === "missing" && (
          <div>
            <AlertTriangle className="mx-auto text-amber-400" size={40} />
            <h1 className="serif mt-4 text-2xl">Missing Token</h1>
            <p className="mt-2 text-xs leading-6 text-[#aaa]">
              No verification token was provided in the link. Please open the exact link received in your inbox.
            </p>
            <Link to="/portal" className="gold-button mt-6 inline-flex">
              Return to Portal
            </Link>
          </div>
        )}

        {status === "success" && (
          <div>
            <CheckCircle2 className="mx-auto text-emerald-400" size={48} />
            <h1 className="serif mt-4 text-3xl">Email Verified</h1>
            <p className="mt-3 text-xs leading-6 text-[#ccc]">{message}</p>
            <p className="mt-2 text-[11px] text-[#888]">
              If you registered as a distributor, your profile is now under administrative review. Once approved, you can sign in directly.
            </p>
            <Link to="/portal" className="gold-button mt-6 inline-flex items-center gap-2">
              Go to Portal Login <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <AlertTriangle className="mx-auto text-red-400" size={48} />
            <h1 className="serif mt-4 text-3xl">Verification Failed</h1>
            <p className="mt-3 text-xs leading-6 text-red-300">{message}</p>
            <Link to="/portal" className="gold-button mt-6 inline-flex">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
