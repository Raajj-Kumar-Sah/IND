import { Link } from "react-router-dom";
import { Factory, ShieldCheck, TrendingUp, MapPin, Mail, Download, Handshake } from "lucide-react";
import { publicDocumentApi } from "../../services/documents.js";

const CORP_OFFICE = "905 Station Road, Ahmedabad, Gujarat – 382440";
const DIVISION = "Petrochemicals Division (Brand: IINDLUBE)";
const LUBE_EMAIL = "iindlube@indiraindustries.co.in";
const HR_EMAIL = "hr@indiraindustries.co.in";
const WEBSITE = "www.indiraindustries.co.in";

export default function About() {
  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");

  return (
    <main>
      {/* Hero with Industrial Manufacturing Backdrop */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#121210] py-12 sm:py-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80")'
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#10100f] via-[#10100f]/90 to-transparent" />

        <div className="container relative z-10">
          <div className="eyebrow flex items-center gap-2 text-[9px] sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-gold" />
            ENTERPRISE HERITAGE & MANUFACTURING
          </div>
          <h1 className="serif mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold">
            A Vision That Moves <span className="gold-text italic block sm:inline">Industries</span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-[#ccc]">
            Indira Industries unites advanced petrochemical blending, specialty industrial chemistry, and technical workwear manufacturing under one enduring benchmark of precision and integrity.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={catalogUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-button flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
            >
              <Download size={14} /> Download Catalogue
            </a>
            <Link
              to="/partner-with-us"
              className="flex items-center justify-center gap-2 border border-gold/40 bg-[#181714] px-5 py-3 text-xs font-bold text-gold hover:bg-gold hover:text-ink transition w-full sm:w-auto text-center"
            >
              <Handshake size={14} /> Partner with Us
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Details Callout */}
      <section className="border-b border-white/10 bg-[#151513] py-8">
        <div className="container grid gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="text-gold shrink-0 mt-1" size={18} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Corporate Headquarters</div>
              <div className="mt-1 text-xs text-[#ccc] leading-5">{CORP_OFFICE}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Factory className="text-gold shrink-0 mt-1" size={18} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Primary Division</div>
              <div className="mt-1 text-xs text-[#ccc] leading-5">{DIVISION}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-gold shrink-0 mt-1" size={18} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Commercial Inquiries</div>
              <div className="mt-1 text-xs text-[#ccc] leading-5">
                {LUBE_EMAIL} | {HR_EMAIL}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <div className="eyebrow">OUR OPERATIONAL APPROACH</div>
          <h2 className="serif mt-4 text-4xl font-bold">
            Strong fundamentals.<br />
            <span className="gold-text italic">Long-term thinking.</span>
          </h2>
        </div>
        <div className="text-xs leading-7 text-[#aaa59b]">
          Indira Industries is a diversified enterprise with flagship interests across industrial and automotive lubricants, consumer process chemistry, and protective technical garments. Headquartered in Ahmedabad, Gujarat, our operating model is grounded in deep technical R&D, continuous batch sampling, automated inventory fulfillment, and mutually profitable partnerships with our authorized distributors.
        </div>
      </section>

      <section className="bg-[#f1ede5] py-20 text-[#191814]">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            [Factory, "Advanced Manufacturing", "Automated blending plants and computerized filling lines compliant with ISO and ASTM lubricant testing."],
            [ShieldCheck, "Institutional Trust", "Stringent chemical purity, API certification, and zero-compromise distributor territory protections."],
            [TrendingUp, "Commercial Progress", "Nationwide freight logistics, structured dealer margin schedules, and dedicated regional sales managers."]
          ].map(([Icon, t, d]) => (
            <div key={t} className="border-t border-[#d5cfc4] pt-6">
              <Icon className="text-[#9a7944]" size={28} />
              <h3 className="serif mt-4 text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-xs leading-6 text-[#777064]">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
