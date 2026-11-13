import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import PageHero from "../../components/PageHero.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import { publicCatalogApi } from "../../services/publicCatalog.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [division, setDivision] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const params = { limit: 100 };
      if (search.trim()) params.search = search.trim();
      if (division) params.division = division;
      const res = await publicCatalogApi.list(params);
      setProducts(res.data?.items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [search, division]);

  return (
    <main>
      <PageHero
        eyebrow="COMMERCIAL PORTFOLIO"
        title="Products & Solutions"
        description="Explore the comprehensive catalogue of industrial lubricants, high-purity chemicals, and technical protective workwear."
      />

      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="ENGINEERED EXCELLENCE"
            title="Browse Complete Catalogue"
            description="All products are manufactured under rigorous ISO standards with full batch traceability."
          />
          <Link
            to="/portal"
            className="flex items-center gap-2 border border-gold/40 bg-[#171714] px-4 py-2.5 text-xs text-gold hover:bg-gold hover:text-ink"
          >
            <ShoppingBag size={14} /> Distributor Pricing Portal <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-white/10 py-4">
          <div className="flex flex-1 items-center gap-2 border border-white/15 bg-[#171714] px-3 py-2 max-w-sm">
            <Search size={14} className="text-[#8e887d]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white outline-none"
              placeholder="Search by product name, SKU or specification..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["", "IINDLUBE", "IINDPURE", "IINDSTYL"].map((d) => (
              <button
                key={d}
                onClick={() => setDivision(d)}
                className={`border px-3 py-2 text-xs transition ${
                  division === d
                    ? "border-gold bg-[#2b261c] text-gold font-semibold"
                    : "border-white/10 text-[#aaa59b] hover:text-white"
                }`}
              >
                {d === "" ? "ALL DIVISIONS" : d}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
        {loading && <p className="mt-6 text-xs text-[#aaa]">Loading product catalogue…</p>}

        {!loading && products.length === 0 && (
          <div className="mt-12 border border-white/10 bg-[#171714] p-12 text-center">
            <div className="serif text-xl">No products match your criteria</div>
            <p className="mt-2 text-xs text-[#888]">
              Try adjusting your search query or selecting a different division.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={{
                id: p._id || p.id,
                name: p.name,
                division: p.division,
                sku: p.sku,
                category: p.category?.name || p.brand || p.division,
                price: p.price,
                stockQuantity: p.stockQuantity,
                description: p.shortDescription || p.description,
                image: p.images?.[0]?.url || "/placeholder-product.jpg"
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
