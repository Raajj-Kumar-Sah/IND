import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Factory,
  ShieldCheck,
  TrendingUp,
  Download,
  Handshake,
  MapPin,
  Mail,
  Flame,
  Award,
  Truck,
  Droplet
} from "lucide-react";
import { Link } from "react-router-dom";
import { publicDocumentApi } from "../../services/documents.js";

const CORP_OFFICE = "905 Station Road, Ahmedabad, Gujarat – 382440";
const DIVISION = "Petrochemicals Division (Brand: IINDLUBE)";
const LUBE_EMAIL = "iindlube@indiraindustries.co.in";
const HR_EMAIL = "hr@indiraindustries.co.in";
const WEBSITE = "www.indiraindustries.co.in";

const divisions = [
  {
    code: "01",
    name: "IINDLUBE",
    type: "PETROCHEMICALS & PRECISION LUBRICANTS",
    desc: "Engineered high-viscosity synthetic motor oils, extreme-pressure gear oils, and anti-wear hydraulic fluids formulated for peak performance.",
    tag: "OEM-GRADE PETROCHEMICALS",
    link: "/iindlube",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    code: "02",
    name: "IINDPURE",
    type: "PROCESS CHEMISTRY & PURIFICATION",
    desc: "Specialty industrial chemicals, water treatment reagents, and solvent formulations with strict batch-to-batch molecular consistency.",
    tag: "HIGH-PURITY PROCESS ESSENTIALS",
    link: "/iindpure",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
  },
  {
    code: "03",
    name: "IINDSTYL",
    type: "TECHNICAL WORKWEAR & APPAREL",
    desc: "Flame-retardant (FR) coveralls, electrostatic-discharge safety suits, and durable mechanical utility wear for harsh environments.",
    tag: "ENGINEERED PROTECTIVE APPAREL",
    link: "/iindstyl",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Home() {
  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");

  return (
    <>
      <main>
        {/* Hero Section with Rich Industrial Lubricants Background */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#10100f]">
          {/* Lubricant Oil Backdrop */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1920&q=80")'
            }}
          />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-40 z-0" />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#10100f] via-[#10100f]/95 to-[#10100f]/70" />

          <div className="container relative z-10 grid min-h-[550px] sm:min-h-[700px] items-center gap-10 sm:gap-12 py-12 sm:py-24 lg:grid-cols-[1.15fr_.85fr]">
            <div className="max-w-[700px]">
              <div className="mb-4 sm:mb-6 flex items-center gap-3">
                <span className="h-px w-6 sm:w-10 bg-gold" />
                <span className="eyebrow !text-gold text-[9px] sm:text-[10px]">
                  PETROCHEMICALS & INDUSTRIAL LUBRICANTS ENTERPRISE
                </span>
              </div>

              <h1 className="serif text-3xl sm:text-5xl lg:text-[74px] leading-[1.12] sm:leading-[1.08] tracking-[-.035em] font-bold text-white">
                Engineering Power.<br />
                <span className="gold-text italic">Formulating</span> Progress.
              </h1>

              <p className="mt-4 sm:mt-6 max-w-[540px] text-xs sm:text-[15px] leading-6 sm:leading-7 text-[#ccc]">
                Indira Industries powers critical machinery, heavy automotive fleets, and modern industrial plants with API-certified lubricants, specialty process chemicals, and technical safety apparel.
              </p>

              {/* Action Buttons: Catalogue Download & Partner with Us */}
              <div className="mt-6 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
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
                  className="flex items-center justify-center gap-2 border border-gold/40 bg-gold/10 px-5 py-3 text-xs font-bold tracking-[.1em] text-gold hover:bg-gold hover:text-ink transition text-center w-full sm:w-auto"
                >
                  <Handshake size={15} /> Partner with Us
                </Link>

                <Link
                  to="/products"
                  className="flex items-center justify-center border border-white/20 bg-white/5 px-5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition text-center w-full sm:w-auto"
                >
                  View Products
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-2 sm:gap-8 border-t border-white/10 pt-6">
                <div>
                  <div className="serif text-xl sm:text-2xl text-gold">IINDLUBE</div>
                  <div className="mt-0.5 text-[8px] sm:text-[9px] tracking-[.15em] text-[#8f8a80]">
                    LUBRICANTS
                  </div>
                </div>
                <div>
                  <div className="serif text-xl sm:text-2xl text-white">ISO 9001</div>
                  <div className="mt-0.5 text-[8px] sm:text-[9px] tracking-[.15em] text-[#8f8a80]">
                    CERTIFIED
                  </div>
                </div>
                <div>
                  <div className="serif text-xl sm:text-2xl text-gold">AHMEDABAD</div>
                  <div className="mt-0.5 text-[8px] sm:text-[9px] tracking-[.15em] text-[#8f8a80]">
                    GUJARAT HQ
                  </div>
                </div>
              </div>
            </div>

            {/* Emblem Badge with Real Uploaded Logo */}
            <div className="relative mx-auto flex aspect-square w-full max-w-[450px] items-center justify-center">
              <div className="absolute inset-[6%] rounded-full border border-gold/30 animate-pulse" />
              <div className="absolute inset-[14%] rounded-full border border-gold/20" />
              <div className="absolute inset-[22%] rounded-full border border-gold/15" />
              <div className="absolute h-[68%] w-[68%] rotate-45 border border-gold/25" />

              {/* Real Logo in circular luxury frame */}
              <div className="relative flex h-[210px] w-[210px] items-center justify-center rounded-full border-2 border-gold/70 bg-[#141412] p-2 shadow-[0_0_120px_rgba(209,180,119,.25)]">
                <img
                  src="/logo.jpg"
                  alt="Indira Industries Logo"
                  className="h-full w-full rounded-full object-contain"
                />
              </div>

              <div className="absolute right-0 top-[15%] border border-[#5a4a30] bg-[#171613]/95 px-4 py-2.5 backdrop-blur shadow-xl">
                <span className="eyebrow !text-gold">PETROCHEMICALS</span>
                <div className="mt-0.5 text-xs text-white">IINDLUBE Division</div>
              </div>

              <div className="absolute bottom-[14%] left-0 border border-[#5a4a30] bg-[#171613]/95 px-4 py-2.5 backdrop-blur shadow-xl">
                <span className="eyebrow !text-gold">CORPORATE HQ</span>
                <div className="mt-0.5 text-xs text-white">Ahmedabad, Gujarat</div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="container flex items-center justify-between border-t border-white/10 py-4 text-[9px] tracking-[.2em] text-[#817b70]">
            <span>INDIRA INDUSTRIES · PETROCHEMICALS & LUBRICANTS</span>
            <a href="#divisions" className="flex items-center gap-2 hover:text-gold">
              EXPLORE DIVISIONS <ArrowDown size={13} />
            </a>
          </div>
        </section>

        {/* Corporate Identity Strip with Required Data */}
        <section className="border-b border-white/10 bg-[#181715] py-6">
          <div className="container grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="text-gold shrink-0 mt-1" size={18} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Corporate Office</div>
                <div className="mt-1 text-xs text-[#ccc] leading-5">{CORP_OFFICE}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Flame className="text-gold shrink-0 mt-1" size={18} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Petrochemicals Division</div>
                <div className="mt-1 text-xs text-[#ccc] leading-5">{DIVISION}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-gold shrink-0 mt-1" size={18} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Commercial Inquiries</div>
                <div className="mt-1 text-xs text-[#ccc] leading-5">
                  <a href={`mailto:${LUBE_EMAIL}`} className="hover:text-gold block">{LUBE_EMAIL}</a>
                  <a href={`mailto:${HR_EMAIL}`} className="hover:text-gold block text-[11px] text-[#888]">{HR_EMAIL}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-[#f1ede5] py-24 text-[#191814]">
          <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <div className="eyebrow !text-[#9a7944]">WHO WE ARE</div>
              <h2 className="serif mt-5 text-4xl leading-tight sm:text-5xl">
                A vision that<br />moves industries.
              </h2>
            </div>
            <div className="max-w-[700px]">
              <p className="text-xl leading-9 text-[#514c43]">
                Indira Industries is built on an enduring commitment: driving national manufacturing and transportation through exacting chemical engineering, tribological science, and uncompromising product purity.
              </p>
              <p className="mt-5 leading-7 text-[#777064]">
                From our corporate headquarters in Ahmedabad, Gujarat, we spearhead continuous innovation across synthetic lubricants, heavy-duty engine formulations, specialty industrial degreasers, and high-tensile technical apparel.
              </p>
              <div className="mt-9 grid grid-cols-3 gap-4 border-t border-[#d6d0c5] pt-6">
                <div>
                  <Factory className="mb-3 text-[#a17d43]" />
                  <b className="text-sm">Advanced Blending</b>
                  <p className="mt-1 text-xs text-[#777064]">Modern automated plant</p>
                </div>
                <div>
                  <ShieldCheck className="mb-3 text-[#a17d43]" />
                  <b className="text-sm">Tribology Lab</b>
                  <p className="mt-1 text-xs text-[#777064]">ASTM & ISO testing</p>
                </div>
                <div>
                  <TrendingUp className="mb-3 text-[#a17d43]" />
                  <b className="text-sm">Channel Prosperity</b>
                  <p className="mt-1 text-xs text-[#777064]">Rapid distributor growth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divisions Section with Photo Cards */}
        <section id="divisions" className="container py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">OUR BUSINESS PORTFOLIO</div>
              <h2 className="serif mt-4 text-4xl sm:text-5xl">
                Three divisions.<br />
                <span className="gold-text italic">One commitment.</span>
              </h2>
            </div>
            <p className="max-w-[380px] text-sm leading-6 text-[#969086]">
              Focused petrochemical and engineering expertise connected by our shared promise of quality, performance, and dependable dispatch.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {divisions.map((d) => (
              <article
                className="group relative overflow-hidden border border-white/10 bg-[#171714] transition hover:border-gold/60"
                key={d.code}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 opacity-80"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">{d.code} / DIVISION</span>
                    <ArrowUpRight className="text-gold transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] tracking-[.16em] text-[#9a927f] font-semibold">{d.type}</div>
                    <h3 className="serif mt-2 text-3xl text-gold">{d.name}</h3>
                    <p className="mt-3 text-xs leading-6 text-[#a6a095]">{d.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[9px] font-bold tracking-[.18em] text-[#d3c6ab]">{d.tag}</span>
                    <Link to={d.link} className="text-xs text-gold underline">Explore →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Partner with Us Callout Section */}
        <section className="relative overflow-hidden border-y border-white/10 bg-[#141412] py-20">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80")'
            }}
          />
          <div className="container relative z-10 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <div>
              <div className="eyebrow !text-gold">CHANNEL EXPANSION · GUJARAT & PAN-INDIA</div>
              <h2 className="serif mt-4 text-4xl leading-tight sm:text-5xl">
                Partner with IINDLUBE.<br />
                <span className="gold-text italic">Drive your market ahead.</span>
              </h2>
              <p className="mt-4 text-xs leading-7 text-[#aaa]">
                We are actively appointing authorized stockists, district distributors, and retail dealership partners across industrial corridors and automotive hubs. Benefit from exclusive territories, attractive margins, and dedicated corporate marketing support.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                to="/partner-with-us"
                className="gold-button inline-flex items-center justify-center gap-2 text-xs"
              >
                <Handshake size={15} /> Partner with Us Overview
              </Link>
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-white/20 bg-[#1c1c19] px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                <Download size={14} /> Download Catalogue (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section id="contact" className="container py-20">
          <div className="flex flex-col justify-between gap-8 border border-[#4b412f] bg-[radial-gradient(ellipse_at_right,rgba(199,166,106,.15),transparent_60%),#171613] p-8 md:flex-row md:items-center md:p-12">
            <div>
              <div className="eyebrow">HEADQUARTERS & COMMERCIAL DESK</div>
              <h2 className="serif mt-3 text-3xl sm:text-4xl">Let’s build what’s next.</h2>
              <p className="mt-3 text-xs text-[#a6a095]">
                Corporate Office: {CORP_OFFICE} · Contact: {LUBE_EMAIL}
              </p>
            </div>
            <Link to="/contact" className="gold-button inline-flex items-center gap-2 text-xs">
              Contact our team <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
