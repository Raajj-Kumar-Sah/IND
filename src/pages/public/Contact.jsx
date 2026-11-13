import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Globe, Download, Handshake, Building2 } from "lucide-react";
import PageHero from "../../components/PageHero.jsx";
import { publicDocumentApi } from "../../services/documents.js";

const CORP_OFFICE = "905 Station Road, Ahmedabad, Gujarat – 382440";
const DIVISION = "Petrochemicals Division (Brand: IINDLUBE)";
const LUBE_EMAIL = "iindlube@indiraindustries.co.in";
const HR_EMAIL = "hr@indiraindustries.co.in";
const WEBSITE = "www.indiraindustries.co.in";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");

  return (
    <>
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[#121210] py-12 sm:py-20">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80")'
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#10100f] via-[#10100f]/90 to-transparent" />

          <div className="container relative z-10">
            <div className="eyebrow flex items-center gap-2 text-[9px] sm:text-[10px]">
              <span className="h-2 w-2 rounded-full bg-gold" />
              CORPORATE HEADQUARTERS & COMMERCIAL DESK
            </div>
            <h1 className="serif mt-3 text-3xl sm:text-5xl font-bold">
              Connect with <span className="gold-text italic block sm:inline">Indira Industries</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm leading-6 text-[#ccc]">
              Reach our Petrochemicals Division for bulk lubricant pricing, industrial oil formulations, authorized dealership inquiries, and corporate administration.
            </p>
          </div>
        </section>

        <section className="container grid gap-8 sm:gap-12 py-10 sm:py-20 lg:grid-cols-[.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="border border-white/10 bg-[#171714] p-6 space-y-5">
              <div className="flex gap-4">
                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                <div>
                  <b className="text-sm text-white">Corporate Headquarters</b>
                  <p className="mt-1 text-xs text-[#aaa] leading-5">{CORP_OFFICE}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Building2 className="text-gold shrink-0 mt-1" size={20} />
                <div>
                  <b className="text-sm text-white">Operating Division</b>
                  <p className="mt-1 text-xs text-gold font-semibold">{DIVISION}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-gold shrink-0 mt-1" size={20} />
                <div>
                  <b className="text-sm text-white">Official Communications</b>
                  <p className="mt-1 text-xs text-[#ccc]">
                    Petrochemicals: <a href={`mailto:${LUBE_EMAIL}`} className="text-gold hover:underline">{LUBE_EMAIL}</a>
                  </p>
                  <p className="mt-0.5 text-xs text-[#888]">
                    Careers & Recruitment: <a href={`mailto:${HR_EMAIL}`} className="text-gold hover:underline">{HR_EMAIL}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Globe className="text-gold shrink-0 mt-1" size={20} />
                <div>
                  <b className="text-sm text-white">Official Web Portal</b>
                  <p className="mt-1 text-xs text-[#ccc]">
                    <a href={`https://${WEBSITE}`} target="_blank" rel="noreferrer" className="text-gold hover:underline">
                      {WEBSITE}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Assets Card */}
            <div className="border border-gold/30 bg-[#181815] p-6">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Commercial Collaterals</div>
              <h3 className="serif mt-1 text-xl font-bold">Download Official Assets</h3>
              <p className="mt-2 text-xs leading-5 text-[#999]">
                Access the official IINDLUBE lubricants catalogue or initiate a formal dealership application with our team.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={catalogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-button inline-flex items-center gap-1.5 py-2 text-xs"
                >
                  <Download size={13} /> IINDLUBE Catalogue (PDF)
                </a>
                <Link
                  to="/partner-with-us"
                  className="border border-white/20 px-3.5 py-2 text-xs text-white hover:bg-white/10 transition inline-flex items-center gap-1.5"
                >
                  <Handshake size={13} /> Partner with Us
                </Link>
              </div>
            </div>
          </div>

          <form
            className="grid gap-4 border border-white/10 bg-[#171714] p-8 shadow-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="eyebrow">COMMERCIAL ENQUIRY</div>
            <h2 className="serif text-2xl font-bold">Send a Message</h2>
            <p className="text-xs text-[#999]">
              Our Ahmedabad sales desk will respond within 24 business hours.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <input required placeholder="Full name *" className="field" />
              <input required type="email" placeholder="Email address *" className="field" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="Company / Firm name" className="field" />
              <input required type="tel" placeholder="Phone number *" className="field" />
            </div>

            <select className="field" defaultValue="">
              <option value="" disabled>Select Enquiry Type *</option>
              <option>IINDLUBE Lubricants & Dealership</option>
              <option>Industrial Bulk Oil Supply</option>
              <option>Chemical Solutions & Reagents</option>
              <option>Careers & Human Resources</option>
              <option>General Corporate Administration</option>
            </select>

            <textarea required rows="4" placeholder="Your requirements or questions..." className="field" />

            <button className="gold-button w-full sm:w-fit justify-center text-xs">
              Submit Enquiry
            </button>

            {sent && (
              <p className="text-xs text-emerald-400">
                Thank you! Your enquiry has been received. Our team will contact you shortly.
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
