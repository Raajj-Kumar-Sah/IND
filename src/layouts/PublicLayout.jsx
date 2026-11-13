import { Outlet, Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X, Download, MapPin, Mail, Phone, Handshake } from "lucide-react";
import { useState } from "react";
import { publicDocumentApi } from "../services/documents.js";

const CORP_OFFICE = "905 Station Road, Ahmedabad, Gujarat – 382440";
const DIVISION = "Petrochemicals Division (Brand: IINDLUBE)";
const LUBE_EMAIL = "iindlube@indiraindustries.co.in";
const HR_EMAIL = "hr@indiraindustries.co.in";
const WEBSITE = "www.indiraindustries.co.in";

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");

  const nav = [
    ["About", "/about"],
    ["Brands", "/brands"],
    ["Products", "/products"],
    ["Partner with Us", "/partner-with-us"],
    ["Careers", "/careers"],
    ["Contact", "/contact"]
  ];

  return (
    <div className="site-shell min-h-screen">
      {/* Top Corporate Information Strip */}
      <div className="border-b border-white/10 bg-[#0c0c0a] py-2 text-[11px] text-[#8e887d]">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-gold" />
            <span>Corporate Office: <strong className="text-[#ccc]">{CORP_OFFICE}</strong></span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hidden sm:inline">Division: <strong className="text-gold">{DIVISION}</strong></span>
            <span className="hidden md:inline">|</span>
            <a href={`mailto:${LUBE_EMAIL}`} className="flex items-center gap-1 hover:text-gold">
              <Mail size={12} className="text-gold" /> {LUBE_EMAIL}
            </a>
            <a
              href={catalogUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold hover:bg-gold hover:text-ink transition"
            >
              <Download size={11} /> IINDLUBE CATALOGUE
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10100f]/95 backdrop-blur">
        <div className="container flex h-[82px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Indira Industries Logo"
              className="h-12 w-12 rounded-full border border-gold/60 object-contain shadow-lg shadow-gold/10"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
            <div>
              <div className="text-[14px] font-bold tracking-[.22em] text-white">INDIRA</div>
              <div className="text-[9px] tracking-[.28em] text-[#a39d91]">INDUSTRIES</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "!text-gold font-semibold" : ""} ${
                    to === "/partner-with-us" ? "font-bold text-gold/90" : ""
                  }`
                }
              >
                {label.toUpperCase()}
              </NavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/partner-with-us"
              className="flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-3.5 py-2 text-[10px] font-bold tracking-[.1em] text-gold hover:bg-gold hover:text-ink transition"
            >
              <Handshake size={14} /> PARTNER WITH US
            </Link>
            <Link
              to="/portal"
              className="flex items-center gap-1.5 border border-white/20 bg-[#161614] px-3.5 py-2 text-[10px] font-bold tracking-[.1em] text-white hover:border-gold hover:text-gold transition"
            >
              PORTAL <ArrowUpRight size={13} />
            </Link>
          </div>

          <button
            className="lg:hidden text-gold"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-white/10 bg-[#151512] px-6 py-4 lg:hidden">
            {nav.map(([label, to]) => (
              <Link
                onClick={() => setOpen(false)}
                className="block py-3 text-xs tracking-widest text-[#d6d0c5] hover:text-gold"
                key={to}
                to={to}
              >
                {label.toUpperCase()}
              </Link>
            ))}
            <a
              href={catalogUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 py-3 text-xs tracking-widest text-gold font-bold"
            >
              <Download size={14} /> DOWNLOAD CATALOGUE (PDF)
            </a>
            <Link
              onClick={() => setOpen(false)}
              className="block py-3 text-xs tracking-widest text-gold font-bold border-t border-white/10 mt-2"
              to="/portal"
            >
              BUSINESS PORTAL →
            </Link>
          </nav>
        )}
      </header>

      <Outlet />

      {/* Global Comprehensive Footer with Full Corporate Details */}
      <footer className="border-t border-white/10 py-14 bg-[#0a0a09]">
        <div className="container grid gap-10 md:grid-cols-[1.5fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Indira Industries Logo"
                className="h-10 w-10 rounded-full border border-gold/50 object-contain"
              />
              <div>
                <div className="serif text-2xl font-bold text-gold">INDIRA INDUSTRIES</div>
                <div className="text-[10px] tracking-widest text-[#888]">{DIVISION}</div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-xs leading-6 text-[#8f8a80]">
              Premier Indian manufacturer and distributor of high-performance industrial lubricants, synthetic engine oils, specialty chemicals, and protective workwear.
            </p>

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-[#aaa]">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span>{CORP_OFFICE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <span>Petrochemicals: <a href={`mailto:${LUBE_EMAIL}`} className="text-white hover:text-gold">{LUBE_EMAIL}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <span>Careers & HR: <a href={`mailto:${HR_EMAIL}`} className="text-white hover:text-gold">{HR_EMAIL}</a></span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-button inline-flex items-center gap-1.5 py-2 text-xs"
              >
                <Download size={13} /> Download IINDLUBE Catalogue
              </a>
              <Link
                to="/partner-with-us"
                className="border border-white/20 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                Partner with Us
              </Link>
            </div>
          </div>

          <div>
            <div className="eyebrow">EXPLORE & PARTNER</div>
            <div className="mt-4 grid gap-3 text-xs text-[#aaa59b]">
              <Link to="/about" className="hover:text-gold">About the Enterprise</Link>
              <Link to="/brands" className="hover:text-gold">Flagship Brands</Link>
              <Link to="/products" className="hover:text-gold">Complete Product Catalogue</Link>
              <Link to="/partner-with-us" className="hover:text-gold text-gold font-bold">Partner with IINDLUBE (Distributorship)</Link>
              <Link to="/careers" className="hover:text-gold">Careers & Job Openings</Link>
              <Link to="/contact" className="hover:text-gold">Contact Headquarters</Link>
              <Link to="/portal" className="hover:text-gold">Distributor & Admin Portal</Link>
            </div>
          </div>

          <div>
            <div className="eyebrow">PETROCHEMICAL DIVISIONS</div>
            <div className="mt-4 grid gap-3 text-xs text-[#aaa59b]">
              <Link to="/iindlube" className="hover:text-gold">
                <strong className="text-white block">IINDLUBE</strong>
                <span>Precision Industrial & Automotive Lubricants</span>
              </Link>
              <Link to="/iindpure" className="hover:text-gold">
                <strong className="text-white block">IINDPURE</strong>
                <span>Process Chemistry & Water Treatment</span>
              </Link>
              <Link to="/iindstyl" className="hover:text-gold">
                <strong className="text-white block">IINDSTYL</strong>
                <span>Technical Protective Safety Apparel</span>
              </Link>
            </div>

            <div className="mt-6 border border-white/10 bg-[#141412] p-4 text-[11px] text-[#888]">
              <div className="font-bold text-white mb-1">Channel Distributorship Desk</div>
              For bulk dealership allocation across Gujarat and national freight corridors, visit our{" "}
              <Link to="/partner-with-us" className="text-gold underline">Partner with Us</Link> portal.
            </div>
          </div>
        </div>

        <div className="container mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] text-[#777269] md:flex-row">
          <span>© {new Date().getFullYear()} Indira Industries. All rights reserved. Registered in Ahmedabad, Gujarat.</span>
          <span className="tracking-[.16em]">BUILT ON TRUST. DRIVEN BY PROGRESS.</span>
        </div>
      </footer>
    </div>
  );
}
