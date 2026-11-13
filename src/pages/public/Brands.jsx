import { Link } from "react-router-dom";
import { ArrowRight, Download, Handshake, ShieldCheck, Flame, Droplets, Shirt, MapPin, Mail, Globe } from "lucide-react";
import { publicDocumentApi } from "../../services/documents.js";

const CORP = {
  address: "905 Station Road, Ahmedabad, Gujarat – 382440",
  division: "Petrochemicals Division (Brand: IINDLUBE)",
  email: "iindlube@indiraindustries.co.in",
  hr: "hr@indiraindustries.co.in",
  website: "www.indiraindustries.co.in",
};

const brands = [
  {
    code: "IINDLUBE",
    path: "/iindlube",
    icon: Flame,
    title: "Advanced Industrial & Automotive Lubrication",
    tagline: "Precision Tribology and Extreme Pressure Protection",
    description:
      "Engineered for high-stress manufacturing environments, heavy earthmoving equipment, precision CNC machinery, and high-performance commercial fleets. Formulated with premium synthetic base oils and tailored additive chemistry.",
    highlights: [
      "Heavy-duty engine oils & transmission fluids",
      "Synthetic hydraulic & circulating oils",
      "Extreme-pressure industrial greases",
      "Custom metalworking fluids & coolants",
    ],
    badge: "ISO 9001 & OEM CERTIFIED",
    bgImage: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=900&auto=format&fit=crop&q=60",
    showCatalog: true,
    showPartner: true,
    accentColor: "#c9a84c",
  },
  {
    code: "IINDPURE",
    path: "/iindpure",
    icon: Droplets,
    title: "High-Purity Chemicals & Process Essentials",
    tagline: "Ultra-Clean Formulations and Sustainable Chemistry",
    description:
      "Supplying industrial water treatment chemistry, precision electronic cleaning solvents, laboratory-grade reagents, and process purification compounds with exacting batch-to-batch consistency and rigorous quality control.",
    highlights: [
      "Effluent and water treatment polymers",
      "Surface preparation & degreasing agents",
      "Pharmaceutical-grade raw ingredients",
      "Specialty process catalysts & solvents",
    ],
    badge: "REACH & GREEN CHEMISTRY COMPLIANT",
    bgImage: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=900&auto=format&fit=crop&q=60",
    showCatalog: false,
    showPartner: false,
    accentColor: "#4caec9",
  },
  {
    code: "IINDSTYL",
    path: "/iindstyl",
    icon: Shirt,
    title: "Technical Apparel & Protective Workwear",
    tagline: "Engineered Ergonomics Meets Industrial Durability",
    description:
      "Protecting workforce personnel in high-heat, flame-risk, chemical-splash, and cleanroom operating environments. Designed with high-tensile aramid fibers, moisture-wicking weaves, and ergonomic seam constructions.",
    highlights: [
      "Flame-retardant (FR) coveralls & jackets",
      "Anti-static ESD laboratory garments",
      "High-visibility reflective safety apparel",
      "Heavy-duty mechanical utility trousers",
    ],
    badge: "EN ISO 11612 & OSHA CERTIFIED",
    bgImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&auto=format&fit=crop&q=60",
    showCatalog: false,
    showPartner: false,
    accentColor: "#a84cc9",
  },
];

export default function Brands() {
  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");

  return (
    <main className="min-h-screen bg-[#0f0e0b]">
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: 420 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=1600&auto=format&fit=crop&q=70')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0f0e0b]" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <img src="/logo.jpg" alt="Indira Industries Logo" className="h-14 w-14 rounded-full object-cover border-2 border-[#c9a84c] shadow-lg" />
          </div>
          <p className="text-xs font-bold tracking-[0.25em] text-[#c9a84c] uppercase mb-3">Enterprise Divisions</p>
          <h1 className="serif text-4xl md:text-6xl font-bold text-white leading-tight">
            Our Flagship <span className="text-[#c9a84c]">Brands</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-[#ccc] text-sm leading-7">
            Indira Industries unifies three high-impact manufacturing divisions driving industrial reliability,
            process purity, and workplace safety across India and beyond.
          </p>
          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-black text-xs font-bold px-6 py-3 transition-colors"
            >
              <Download size={15} /> Download IINDLUBE Catalogue
            </a>
            <Link
              to="/partner-with-us"
              className="inline-flex items-center gap-2 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 text-xs font-bold px-6 py-3 transition-colors"
            >
              <Handshake size={15} /> Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Corporate strip ── */}
      <div className="bg-[#171714] border-y border-white/10">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-6 text-[10px] text-[#aaa]">
          <span className="flex items-center gap-2"><MapPin size={12} className="text-[#c9a84c]" />{CORP.address}</span>
          <span className="flex items-center gap-2"><Flame size={12} className="text-[#c9a84c]" />{CORP.division}</span>
          <span className="flex items-center gap-2"><Mail size={12} className="text-[#c9a84c]" />{CORP.email}</span>
          <span className="flex items-center gap-2"><Globe size={12} className="text-[#c9a84c]" />{CORP.website}</span>
        </div>
      </div>

      {/* ── Brand cards ── */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.25em] text-[#c9a84c] uppercase">Portfolio Architecture</p>
          <h2 className="serif mt-3 text-3xl md:text-4xl font-bold text-white">Three Pillars of Modern Industry</h2>
          <p className="mt-3 text-sm text-[#aaa] max-w-xl mx-auto">
            Each brand operates dedicated R&D labs and accredited manufacturing plants engineered to exceed international quality standards.
          </p>
        </div>

        <div className="space-y-10">
          {brands.map((b) => {
            const Icon = b.icon;
            return (
              <article key={b.code} className="relative overflow-hidden border border-white/10 bg-[#171714]">
                {/* Brand image strip */}
                <div
                  className="h-40 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${b.bgImage}')` }}
                >
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 flex items-center px-8 md:px-12 gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                      style={{ borderColor: b.accentColor }}
                    >
                      <Icon size={22} style={{ color: b.accentColor }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest" style={{ color: b.accentColor }}>
                        {b.code} DIVISION
                      </div>
                      <div className="text-white font-bold text-lg mt-0.5">{b.title}</div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="grid gap-8 p-8 lg:grid-cols-[1fr_1.4fr] lg:p-12">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: b.accentColor }}>
                      {b.tagline}
                    </p>
                    <div
                      className="mt-4 inline-flex items-center gap-1.5 rounded border px-3 py-1 text-[10px] font-bold"
                      style={{ borderColor: `${b.accentColor}50`, backgroundColor: `${b.accentColor}18`, color: b.accentColor }}
                    >
                      <ShieldCheck size={12} /> {b.badge}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to={b.path}
                        className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 transition-colors"
                        style={{ backgroundColor: b.accentColor, color: "#000" }}
                      >
                        Explore {b.code} <ArrowRight size={14} />
                      </Link>
                      {b.showCatalog && (
                        <a
                          href={catalogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border text-xs font-bold px-5 py-2.5 transition-colors"
                          style={{ borderColor: b.accentColor, color: b.accentColor }}
                        >
                          <Download size={13} /> Download Catalogue
                        </a>
                      )}
                      {b.showPartner && (
                        <Link
                          to="/partner-with-us"
                          className="inline-flex items-center gap-2 border border-white/20 text-[#aaa] hover:border-white/40 text-xs font-bold px-5 py-2.5 transition-colors"
                        >
                          <Handshake size={13} /> Partner With Us
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <p className="text-xs leading-7 text-[#ccc]">{b.description}</p>
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#aaa]">
                        Core Capabilities & Product Lines
                      </div>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {b.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-[#999]">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: b.accentColor }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Partner CTA banner ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&auto=format&fit=crop&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#c9a84c] uppercase mb-3">Join Our Network</p>
          <h2 className="serif text-3xl md:text-4xl font-bold text-white">
            Become an Authorised IINDLUBE Distributor
          </h2>
          <p className="mt-4 text-[#ccc] text-sm max-w-xl mx-auto leading-7">
            Partner with India's trusted petrochemicals brand. Download our official partnership documents
            and submit your application online.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-black text-xs font-bold px-8 py-3 transition-colors"
            >
              <Download size={15} /> Download IINDLUBE Catalogue
            </a>
            <Link
              to="/partner-with-us"
              className="inline-flex items-center gap-2 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 text-xs font-bold px-8 py-3 transition-colors"
            >
              <Handshake size={15} /> Partner With Us
            </Link>
          </div>
          <p className="mt-6 text-[10px] text-[#aaa]">
            {CORP.email} &nbsp;|&nbsp; {CORP.address}
          </p>
        </div>
      </section>
    </main>
  );
}
