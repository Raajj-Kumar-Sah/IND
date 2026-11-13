import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Building2,
  TrendingUp,
  Award,
  Truck,
  CheckCircle2,
  FileCheck,
  Send,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import PageHero from "../../components/PageHero.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { publicDocumentApi } from "../../services/documents.js";

const CORP_OFFICE = "905 Station Road, Ahmedabad, Gujarat – 382440";
const DIVISION = "Petrochemicals Division (Brand: IINDLUBE)";
const EMAIL = "iindlube@indiraindustries.co.in";
const WEBSITE = "www.indiraindustries.co.in";

export default function PartnerWithUs() {
  const [form, setForm] = useState({
    companyName: "",
    applicantName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    investmentCapacity: "₹15L – ₹30L",
    storageSpace: "1000 – 2500 sq ft",
    experienceYears: "3 – 5 years",
    message: ""
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await publicDocumentApi.submitPartnership(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit inquiry");
    } finally {
      setBusy(false);
    }
  }

  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");
  const appFormUrl = publicDocumentApi.getDownloadUrl("partnership_application");
  const agreementUrl = publicDocumentApi.getDownloadUrl("partnership_agreement");

  return (
    <main>
      {/* Hero with authentic industrial lubricant background */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#121210] py-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1920&q=80")'
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#10100f] via-[#10100f]/90 to-transparent" />

        <div className="container relative z-10">
          <div className="eyebrow flex items-center gap-2 text-[9px] sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-gold" />
            PARTNER WITH IINDLUBE · PETROCHEMICALS DIVISION
          </div>
          <h1 className="serif mt-3 sm:mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Power Ahead with India’s High-Performance Lubricants Network
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-[#ccc]">
            Join an elite distribution family backed by Indira Industries. We offer exclusive territorial distribution rights, aggressive profit margins, comprehensive marketing collaterals, and world-class synthetic lubricant formulations.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href="#apply"
              className="gold-button flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
            >
              Apply for Distributorship <ArrowRight size={14} />
            </a>
            <a
              href={catalogUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-gold/40 bg-[#171714] px-5 py-3 text-xs font-semibold text-gold hover:bg-gold hover:text-ink transition w-full sm:w-auto text-center"
            >
              <Download size={14} /> Download Catalogue
            </a>
          </div>
        </div>
      </section>

      {/* Official Corporate Office Banner */}
      <div className="border-b border-white/10 bg-[#161614] py-3 sm:py-4 text-xs text-[#aaa]">
        <div className="container flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold shrink-0" />
            <span className="text-[11px] sm:text-xs"><strong>Corporate Office:</strong> {CORP_OFFICE}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span><strong>Division:</strong> {DIVISION}</span>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <section className="container py-12 sm:py-20">
        <SectionHeading
          eyebrow="DISTRIBUTION ADVANTAGE"
          title="Why Partner with Indira Industries IINDLUBE?"
          description="We are committed to mutual commercial prosperity, providing end-to-end support for our authorized channel partners."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-white/10 bg-[#171714] p-6">
            <TrendingUp size={28} className="text-gold" />
            <h3 className="serif mt-4 text-xl font-bold">Attractive Profit Margins</h3>
            <p className="mt-2 text-xs leading-6 text-[#99948a]">
              Industry-leading dealer and distributor margins with quarterly volume performance rebates and incentive bonuses.
            </p>
          </div>

          <div className="border border-white/10 bg-[#171714] p-6">
            <Award size={28} className="text-gold" />
            <h3 className="serif mt-4 text-xl font-bold">OEM-Grade Formulations</h3>
            <p className="mt-2 text-xs leading-6 text-[#99948a]">
              API, ISO, and DIN certified engine oils, hydraulic fluids, gear compounds, and lithium greases with zero quality compromise.
            </p>
          </div>

          <div className="border border-white/10 bg-[#171714] p-6">
            <Truck size={28} className="text-gold" />
            <h3 className="serif mt-4 text-xl font-bold">Reliable Supply & Dispatch</h3>
            <p className="mt-2 text-xs leading-6 text-[#99948a]">
              Guaranteed replenishment cycles from our Ahmedabad manufacturing facility with automated dispatch and shipment tracking.
            </p>
          </div>

          <div className="border border-white/10 bg-[#171714] p-6">
            <ShieldCheck size={28} className="text-gold" />
            <h3 className="serif mt-4 text-xl font-bold">Marketing & Field Support</h3>
            <p className="mt-2 text-xs leading-6 text-[#99948a]">
              Complete retail branding, workshop display racks, mechanic loyalty programs, canopy activations, and technical sales training.
            </p>
          </div>
        </div>
      </section>

      {/* Downloadable Documents Section - Dynamic from Admin Panel */}
      <section className="border-y border-white/10 bg-[#141412] py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">OFFICIAL ASSETS & LEGAL AGREEMENTS</div>
              <h2 className="serif mt-2 text-3xl font-bold">Download Dealership Documents</h2>
              <p className="mt-2 text-xs text-[#aaa]">
                Download official application documents and partnership terms. The admin updates these files dynamically.
              </p>
            </div>
            <span className="text-xs text-gold">MANAGED BY CORPORATE OFFICE</span>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Catalog */}
            <div className="flex flex-col justify-between border border-gold/30 bg-[#181815] p-6 shadow-xl">
              <div>
                <FileCheck size={32} className="text-gold" />
                <h3 className="serif mt-4 text-xl font-bold">IINDLUBE Product Catalogue</h3>
                <p className="mt-2 text-xs text-[#999]">
                  Complete technical catalogue featuring diesel engine oils, PCMO, gear oils, hydraulic fluids, and greases.
                </p>
              </div>
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-button mt-6 inline-flex w-full justify-center text-xs"
              >
                <Download size={14} /> Download Catalogue (PDF)
              </a>
            </div>

            {/* Application Form */}
            <div className="flex flex-col justify-between border border-white/10 bg-[#181815] p-6 shadow-xl">
              <div>
                <FileCheck size={32} className="text-gold" />
                <h3 className="serif mt-4 text-xl font-bold">Partnership Application Form</h3>
                <p className="mt-2 text-xs text-[#999]">
                  Official printable application form for territorial distributorship, retail dealership, or institutional supply.
                </p>
              </div>
              <a
                href={appFormUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 px-4 py-3 text-center text-xs font-semibold text-white hover:bg-white/10 transition mt-6 inline-flex w-full justify-center gap-2"
              >
                <Download size={14} /> Download Application (PDF)
              </a>
            </div>

            {/* Agreement Terms */}
            <div className="flex flex-col justify-between border border-white/10 bg-[#181815] p-6 shadow-xl">
              <div>
                <FileCheck size={32} className="text-gold" />
                <h3 className="serif mt-4 text-xl font-bold">Channel Partner Agreement</h3>
                <p className="mt-2 text-xs text-[#999]">
                  Commercial covenants, territory assignment guidelines, warranty policies, and distributor service levels.
                </p>
              </div>
              <a
                href={agreementUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 px-4 py-3 text-center text-xs font-semibold text-white hover:bg-white/10 transition mt-6 inline-flex w-full justify-center gap-2"
              >
                <Download size={14} /> Download Agreement (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section id="apply" className="container py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <div className="eyebrow">DIRECT APPLICATION</div>
            <h2 className="serif mt-2 text-3xl font-bold">Apply for IINDLUBE Dealership</h2>
            <p className="mt-4 text-xs leading-6 text-[#aaa]">
              Submit your business profile below to initiate the appointment process. Our Regional Channel Manager will get in touch with you for territory review and physical inspection.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-xs text-[#ccc]">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-bold text-white">Corporate Headquarters</div>
                  <div>{CORP_OFFICE}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="text-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-bold text-white">Division</div>
                  <div>{DIVISION}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-bold text-white">Direct Commercial Email</div>
                  <div>{EMAIL}</div>
                  <div className="text-[11px] text-[#888]">hr@indiraindustries.co.in (Careers)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-[#171714] p-8 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 size={48} className="mx-auto text-emerald-400" />
                <h3 className="serif mt-4 text-2xl font-bold">Application Received!</h3>
                <p className="mt-2 text-xs leading-6 text-[#ccc]">
                  Thank you for applying. A confirmation email has been dispatched via Brevo. Our commercial team for Gujarat and regional territories will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gold-button mt-6 text-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Business / Firm Name *</label>
                    <input
                      required
                      className="field mt-1 w-full"
                      placeholder="e.g. Gujarat Lubricants Co."
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">Authorized Contact Person *</label>
                    <input
                      required
                      className="field mt-1 w-full"
                      placeholder="e.g. Rajesh Shah"
                      value={form.applicantName}
                      onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Email Address *</label>
                    <input
                      required
                      type="email"
                      className="field mt-1 w-full"
                      placeholder="contact@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">Phone / Mobile *</label>
                    <input
                      required
                      type="tel"
                      className="field mt-1 w-full"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Target City / Town *</label>
                    <input
                      required
                      className="field mt-1 w-full"
                      placeholder="e.g. Ahmedabad, Surat, Rajkot"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">State *</label>
                    <input
                      required
                      className="field mt-1 w-full"
                      placeholder="e.g. Gujarat"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-[11px] text-[#aaa]">Proposed Capital</label>
                    <select
                      className="field mt-1 w-full"
                      value={form.investmentCapacity}
                      onChange={(e) => setForm({ ...form, investmentCapacity: e.target.value })}
                    >
                      <option>₹10L – ₹15L</option>
                      <option>₹15L – ₹30L</option>
                      <option>₹30L – ₹50L</option>
                      <option>₹50L+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">Warehouse Space</label>
                    <select
                      className="field mt-1 w-full"
                      value={form.storageSpace}
                      onChange={(e) => setForm({ ...form, storageSpace: e.target.value })}
                    >
                      <option>Under 1000 sq ft</option>
                      <option>1000 – 2500 sq ft</option>
                      <option>2500 – 5000 sq ft</option>
                      <option>5000+ sq ft</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#aaa]">Lubricant Experience</label>
                    <select
                      className="field mt-1 w-full"
                      value={form.experienceYears}
                      onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                    >
                      <option>New to Lubricants</option>
                      <option>1 – 3 years</option>
                      <option>3 – 5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#aaa]">Message / Current Infrastructure</label>
                  <textarea
                    rows="3"
                    className="field mt-1 w-full"
                    placeholder="Details about existing retail coverage, fleet vehicles or mechanic network..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {error && <p className="text-xs text-red-300">{error}</p>}

                <button
                  disabled={busy}
                  className="gold-button mt-2 w-full justify-center text-xs"
                >
                  <Send size={14} /> {busy ? "Submitting Application..." : "Submit Distributorship Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
