import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, CheckCircle2, FileText, ShoppingBag, ShieldCheck,
  Layers, Package, PhoneCall, ArrowRight, Gauge, Droplet
} from "lucide-react";
import { publicCatalogApi } from "../../services/publicCatalog.js";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError("");
    publicCatalogApi
      .getBySlug(productId)
      .then((r) => {
        if (live) setProduct(r.data);
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
  }, [productId]);

  if (loading) {
    return (
      <main className="container py-24 text-center">
        <div className="inline-block animate-pulse text-sm text-[#aaa]">
          Loading product specifications and data sheet…
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container py-24 text-center">
        <h1 className="serif text-4xl text-white">Product not found</h1>
        <p className="mt-3 text-sm text-[#999]">{error || "The requested product code does not exist in the active catalogue."}</p>
        <Link className="gold-button mt-6 inline-flex" to="/products">
          Return to Catalogue
        </Link>
      </main>
    );
  }

  const division = product.division?.toLowerCase() || "iindlube";
  const specs = product.specifications || [];
  const mainImage = product.images?.[0]?.url;

  const descriptionText =
    product.description ||
    product.shortDescription ||
    "Engineered under strict ISO certification with high thermal stability, advanced wear protection and guaranteed formulation consistency.";

  return (
    <main className="min-h-screen bg-[#0f0e0b]">
      {/* Breadcrumb strip */}
      <div className="border-b border-white/10 bg-[#141412] py-4">
        <div className="container flex items-center justify-between text-xs text-[#aaa59b]">
          <Link to={`/${division}`} className="inline-flex items-center gap-2 hover:text-gold transition">
            <ArrowLeft size={14} /> BACK TO {product.division} DIVISION
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest text-[#777]">
            <span>{product.division}</span>
            <span>/</span>
            <span>{product.category?.name || "CATALOGUE"}</span>
            <span>/</span>
            <span className="text-gold font-bold">{product.sku}</span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="flex min-h-[460px] items-center justify-center overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle,rgba(199,166,106,.15),transparent_60%),#171714] p-8">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.images?.[0]?.alt || product.name}
                  className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border border-gold/40 text-gold mb-3">
                    <FileText size={56} strokeWidth={1} />
                  </div>
                  <span className="text-xs text-[#777]">Product Image Pending Documentation</span>
                </div>
              )}
            </div>

            {/* Thumbnail preview if multiple images exist */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded border border-white/15 bg-[#171714] p-1"
                  >
                    <img src={img.url} alt="" className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Identity & Descriptions */}
          <div className="flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="eyebrow">{product.division}</span>
                <span className="text-[#555]">/</span>
                <span className="text-xs font-semibold text-gold">{product.category?.name || "LUBRICANTS & FLUIDS"}</span>
              </div>

              <h1 className="serif mt-3 text-3xl md:text-5xl font-bold text-white leading-tight">
                {product.name}
              </h1>

              {/* SKU & Brand Badge Bar */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/10 py-4">
                <div>
                  <span className="text-[10px] tracking-wider text-[#898378] block">PRODUCT CODE</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{product.sku}</span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider text-[#898378] block">BRAND</span>
                  <span className="text-sm font-semibold text-gold mt-0.5 block">{product.brand}</span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider text-[#898378] block">AVAILABILITY</span>
                  <span className={`text-sm font-semibold mt-0.5 block ${product.stockQuantity > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                    {product.stockQuantity > 0 ? "In Distribution Stock" : "Available to Order"}
                  </span>
                </div>
              </div>

              {/* Product Description Section */}
              <div className="mt-6">
                <h3 className="serif text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Layers size={16} className="text-gold" /> Product Overview & Features
                </h3>
                <p className="text-sm leading-7 text-[#ccc] bg-[#141412] p-4 rounded border border-white/5">
                  {descriptionText}
                </p>
                {product.shortDescription && product.description && product.description !== product.shortDescription && (
                  <p className="mt-3 text-xs leading-6 text-[#99948a] italic">
                    "{product.shortDescription}"
                  </p>
                )}
              </div>

              {/* Technical Specifications Table */}
              <div className="mt-8">
                <h3 className="serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Gauge size={18} className="text-gold" /> Technical Specifications
                </h3>

                {specs.length > 0 ? (
                  <div className="overflow-hidden rounded border border-white/10 bg-[#141412]">
                    <table className="w-full text-xs">
                      <tbody>
                        {specs.map((s, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-white/5 ${idx % 2 === 0 ? "bg-[#171714]" : "bg-[#141412]"}`}
                          >
                            <td className="w-2/5 px-4 py-3 font-semibold text-[#aaa]">{s.key}</td>
                            <td className="px-4 py-3 text-white font-medium flex items-center gap-2">
                              <CheckCircle2 size={13} className="text-gold shrink-0" />
                              {s.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-[#888]">
                    Detailed laboratory technical data sheet available on request. Contact commercial sales desk.
                  </p>
                )}
              </div>
            </div>

            {/* Commercial Call to Action */}
            <div className="mt-10 rounded border border-gold/30 bg-gold/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="serif text-lg font-bold text-white">Commercial Supply & Distributorship</h4>
                  <p className="text-xs text-[#aaa] mt-1">
                    Specialized wholesale volume pricing and bulk tanker delivery available for authorized distributors.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link to="/contact" className="gold-button text-xs">
                    Inquire for Supply <ArrowRight size={14} />
                  </Link>
                  <Link to="/portal" className="border border-gold/40 px-4 py-2.5 text-xs text-gold hover:bg-gold/10 transition">
                    Distributor Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
