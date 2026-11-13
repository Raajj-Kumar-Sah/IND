import { Link, useParams } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";

const copy = {
  admin: ["Administration portal", "Manage company operations, products, inventory, distributors and business reports."],
  hr: ["Human resources portal", "Manage job openings, candidate applications and interview workflows."],
  distributor: ["Distributor portal", "Explore your catalogue, place bulk orders and review account activity."]
};

export default function PortalHome() {
  const { role = "" } = useParams();
  const [heading, description] = copy[role] || ["Portal", "This workspace is not available."];
  return <main className="container flex min-h-screen items-center justify-center py-16"><div className="w-full max-w-md border border-white/10 bg-[#171714] p-8"><Link to="/portal" className="inline-flex items-center gap-2 text-xs text-[#a6a095]"><ArrowLeft size={14}/> ALL PORTALS</Link><div className="mt-9 flex h-12 w-12 items-center justify-center border border-gold/50 text-gold"><LockKeyhole/></div><div className="eyebrow mt-7">INDIRA INDUSTRIES / SECURE ACCESS</div><h1 className="serif mt-3 text-3xl">{heading}</h1><p className="mt-3 text-sm leading-6 text-[#9d988e]">{description}</p><form className="mt-8 space-y-4" onSubmit={(e)=>e.preventDefault()}><label className="block text-xs text-[#c8c3b9]">Work email<input type="email" required placeholder="you@company.com" className="mt-2 w-full border border-white/15 bg-[#10100f] px-4 py-3 text-sm outline-none focus:border-gold"/></label><label className="block text-xs text-[#c8c3b9]">Password<input type="password" required placeholder="Enter your password" className="mt-2 w-full border border-white/15 bg-[#10100f] px-4 py-3 text-sm outline-none focus:border-gold"/></label><button className="gold-button w-full" type="submit">Sign in securely</button></form><p className="mt-5 text-center text-[10px] leading-5 text-[#777269]">Preview only — connect this form to the production authentication API before enabling access.</p></div></main>;
}
