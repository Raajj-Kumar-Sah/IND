import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, ArrowRight, Download, Handshake, ShieldCheck } from "lucide-react";
import ProductCard from "../../components/ProductCard.jsx";
import { divisions } from "../../data/catalog.js";
import { publicCatalogApi } from "../../services/publicCatalog.js";
import { publicDocumentApi } from "../../services/documents.js";

const DIVISION_BGS = {
  iindlube: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1920&q=80",
  iindpure: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=80",
  iindstyl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80"
};

export default function Division() {
  const { division: slug } = useParams();
  const lowerSlug = slug?.toLowerCase();
  const data = divisions[lowerSlug];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const catalogUrl = publicDocumentApi.getDownloadUrl("iindlube_catalog");

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError("");
    publicCatalogApi
      .list({ division: data?.name, limit: 100 })
      .then((r) => {
        if (live) setItems(r.data.items || []);
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [data?.name]);

  const products = useMemo(
    () =>
      items.filter(
        (p) =>
          (category === "All" || (p.category?.name || "Uncategorized") === category) &&
          `${p.name} ${p.shortDescription || ""} ${p.sku}`.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query, category]
  );

  if (!data) {
    return (
      <section className="container py-24 text-center">
        <h1 className="serif text-4xl">Division Not Found</h1>
        <Link to="/" className="gold-button mt-6 inline-flex">Return Home</Link>
      </section>
    );
  }

  const categories = ["All", ...new Set(items.map((p) => p.category?.name || "Uncategorized"))];
  const bgImage = DIVISION_BGS[lowerSlug] || DIVISION_BGS.iindlube;

  return (
    <>
      {/* Rich Division Hero with Authentic Background Image */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#121210] py-12 sm:py-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#10100f] via-[#10100f]/90 to-transparent" />

        <div className="container relative z-10">
          <div className="eyebrow flex items-center gap-2 text-[9px] sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-gold" />
            {data.category.toUpperCase()} DIVISION
          </div>
          <h1 className="serif mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold">
            {data.name} <span className="gold-text italic block sm:inline">Portfolio</span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-[#ccc]">
            {data.intro} {data.description}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            {lowerSlug === "iindlube" && (
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-button flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
              >
                <Download size={14} /> Download Catalogue (PDF)
              </a>
            )}
            <Link
              to="/partner-with-us"
              className="flex items-center justify-center gap-2 border border-gold/40 bg-[#181714] px-5 py-3 text-xs font-bold text-gold hover:bg-gold hover:text-ink transition w-full sm:w-auto text-center"
            >
              <Handshake size={14} /> Partner with Us (Dealership)
            </Link>
          </div>
        </div>
      </section>

      {/* Product Catalogue Grid */}
      <section className="container py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">COMMERCIAL CATALOGUE</div>
            <h2 className="serif mt-2 text-3xl font-bold">Explore the {data.name} Range</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-2 border border-white/15 bg-[#171714] px-3">
              <Search size={15} className="text-[#8e887d]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or SKU..."
                className="bg-transparent py-3 text-xs text-white outline-none"
              />
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="field sm:min-w-44 text-xs"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="py-12 text-center text-sm text-[#99948a]">Loading live catalogue…</p>}
        {error && (
          <p className="py-8 text-center text-sm text-red-300">
            Unable to load the product catalogue. Please try again later.
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p._id || p.id}
                  product={{
                    ...p,
                    id: p._id || p.id,
                    category: p.category?.name || "Uncategorized",
                    desc: p.shortDescription || p.description,
                    code: p.sku,
                    pack:
                      p.specifications?.find((s) => /pack|size/i.test(s.key))?.value ||
                      "Standard packaging",
                    division: data.name,
                    image: p.images?.[0]?.url || bgImage
                  }}
                />
              ))}
            </div>
            {products.length === 0 && (
              <p className="py-16 text-center text-sm text-[#99948a]">
                No active products currently listed in this category.
              </p>
            )}
          </>
        )}

        {/* Commercial Banner */}
        <div className="mt-16 border border-[#4b412f] bg-[#171613] p-8 md:flex md:items-center md:justify-between shadow-xl">
          <div>
            <div className="eyebrow flex items-center gap-1.5 !text-gold">
              <ShieldCheck size={14} /> AUTHORIZED DEALERSHIP NETWORK
            </div>
            <h3 className="serif mt-2 text-2xl font-bold">Interested in our {data.name} distribution?</h3>
            <p className="mt-1 text-xs text-[#999]">
              Apply online to become an authorized territorial stockist or retail dealer.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            {lowerSlug === "iindlube" && (
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 px-4 py-2.5 text-xs text-white hover:bg-white/10 transition"
              >
                <Download size={13} className="inline mr-1" /> PDF Catalogue
              </a>
            )}
            <Link to="/partner-with-us" className="gold-button text-xs">
              Apply for Distributorship <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
