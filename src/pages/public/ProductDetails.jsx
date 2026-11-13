
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Layers,
  Package,
  ArrowRight,
  Gauge
} from "lucide-react";

import { publicCatalogApi } from "../../services/publicCatalog.js";
import { findCatalogProduct } from "../../data/catalog.js";

export default function ProductDetails() {
  const { productId } = useParams();
  const location = useLocation();

  const initial =
    location.state?.product || findCatalogProduct(productId);

  const [product, setProduct] = useState(initial);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;

    async function loadProduct() {
      if (!productId) {
        setError("Product ID is missing");
        setLoading(false);
        return;
      }

      const local =
        location.state?.product ||
        findCatalogProduct(productId);

      if (local) {
        setProduct(local);
      }

      setLoading(true);
      setError("");

      try {
        // Detect MongoDB ObjectId
        const isMongoId = /^[a-f\d]{24}$/i.test(productId);

        // Fetch using the correct endpoint
        const response = isMongoId
          ? await publicCatalogApi.getById(productId)
          : await publicCatalogApi.getBySlug(productId);

        // Backend response: { success, message, data }
        const fetchedProduct = response?.data;

        if (!response?.success || !fetchedProduct) {
          throw new Error(
            response?.message || "Product not found"
          );
        }

        if (live) {
          setProduct((previous) => ({
            ...(previous || {}),
            ...fetchedProduct,

            // Preserve existing specifications if backend
            // doesn't provide them
            specifications:
              fetchedProduct.specifications?.length > 0
                ? fetchedProduct.specifications
                : previous?.specifications ||
                  previous?.specs ||
                  [],

            description:
              fetchedProduct.description ||
              previous?.description ||
              previous?.shortDescription ||
              ""
          }));

          setError("");
        }
      } catch (err) {
        if (live) {
          // Preserve local product if API request fails
          const fallback =
            local || findCatalogProduct(productId);

          if (fallback) {
            setProduct(fallback);
            setError("");
          } else {
            setProduct(null);
            setError(
              err.message || "Unable to load product"
            );
          }
        }
      } finally {
        if (live) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      live = false;
    };
  }, [productId, location.state]);

  // Loading state
  if (loading && !product) {
    return (
      <main className="container min-h-[60vh] flex items-center justify-center py-24 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />

          <div className="text-sm text-[#aaa]">
            Loading product specifications and technical data sheet…
          </div>
        </div>
      </main>
    );
  }

  const activeProduct =
    product || findCatalogProduct(productId);

  // Product not found
  if (!activeProduct) {
    return (
      <main className="container min-h-[60vh] flex flex-col items-center justify-center py-24 text-center">
        <h1 className="serif text-3xl sm:text-4xl text-white">
          Product not found
        </h1>

        <p className="mt-3 max-w-md text-sm text-[#999]">
          {error || `The product "${productId}" is not available in the active catalogue.`}
        </p>

        <Link
          className="gold-button mt-6 inline-flex"
          to="/products"
        >
          Return to Complete Catalogue
        </Link>
      </main>
    );
  }

  const division =
    activeProduct.division?.toLowerCase() || "iindlube";

  const categoryName =
    typeof activeProduct.category === "object"
      ? activeProduct.category?.name
      : activeProduct.category || "INDUSTRIAL SOLUTION";

  const specs =
    Array.isArray(activeProduct.specifications) &&
    activeProduct.specifications.length > 0
      ? activeProduct.specifications
      : Array.isArray(activeProduct.specs)
        ? activeProduct.specs
        : [];

  const mainImage =
    activeProduct.images?.[0]?.url ||
    activeProduct.image;

  const descriptionText =
    activeProduct.description ||
    activeProduct.shortDescription ||
    activeProduct.desc ||
    "Product description and technical information available upon commercial request.";

  return (
    <main className="min-h-screen bg-[#0f0e0b]">

      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-[#141412] py-4">
        <div className="container flex items-center justify-between text-xs text-[#aaa59b]">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 hover:text-gold transition"
          >
            <ArrowLeft size={14} />
            BACK TO PRODUCTS
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest text-[#777]">
            <Link
              to={`/${division}`}
              className="hover:text-gold transition uppercase"
            >
              {activeProduct.division}
            </Link>

            <span>/</span>
            <span className="uppercase">{categoryName}</span>

            <span>/</span>

            <span className="text-gold font-bold">
              {activeProduct.sku || activeProduct.code}
            </span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="flex min-h-[460px] items-center justify-center overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle,rgba(199,166,106,.15),transparent_60%),#171714] p-8 shadow-xl">

              {mainImage ? (
                <img
                  src={mainImage}
                  alt={activeProduct.name}
                  className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border border-gold/40 text-gold mb-3 bg-gold/5">
                    <Package size={56} strokeWidth={1} />
                  </div>

                  <span className="text-xs text-[#777] uppercase tracking-wider">
                    {activeProduct.division} Technical Product
                  </span>
                </div>
              )}
            </div>

            {/* Image thumbnails */}
            {activeProduct.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {activeProduct.images.map((img, idx) => (
                  <div
                    key={img._id || img.publicId || idx}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded border border-white/15 bg-[#171714] p-1"
                  >
                    <img
                      src={img.url}
                      alt={`${activeProduct.name} ${idx + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-between py-2">
            <div>

              <div className="flex items-center gap-3">
                <span className="eyebrow">
                  {activeProduct.division}
                </span>

                <span className="text-[#555]">/</span>

                <span className="text-xs font-semibold text-gold">
                  {categoryName}
                </span>
              </div>

              <h1 className="serif mt-3 text-3xl md:text-5xl font-bold text-white leading-tight">
                {activeProduct.name}
              </h1>

              {/* Product identifiers */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/10 py-4">

                <div>
                  <span className="text-[10px] tracking-wider text-[#898378] block">
                    PRODUCT CODE
                  </span>

                  <span className="text-sm font-semibold text-white mt-0.5 block">
                    {activeProduct.sku || activeProduct.code || "—"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] tracking-wider text-[#898378] block">
                    BRAND / DIVISION
                  </span>

                  <span className="text-sm font-semibold text-gold mt-0.5 block">
                    {activeProduct.brand || activeProduct.division}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] tracking-wider text-[#898378] block">
                    AVAILABILITY
                  </span>

                  <span
                    className={`text-sm font-semibold mt-0.5 block ${
                      activeProduct.stockQuantity > 0
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {activeProduct.stockQuantity > 0
                      ? `${activeProduct.stockQuantity} In Distribution Stock`
                      : "Available to Order"}
                  </span>
                </div>
              </div>

              {/* Product Description */}
              <div className="mt-6">
                <h3 className="serif text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Layers size={16} className="text-gold" />
                  Product Overview & Description
                </h3>

                <div className="text-sm leading-7 text-[#ccc] bg-[#141412] p-5 rounded border border-white/5 shadow-inner">
                  <p className="whitespace-pre-line">
                    {descriptionText}
                  </p>

                  {activeProduct.shortDescription &&
                    activeProduct.description &&
                    activeProduct.description !==
                      activeProduct.shortDescription && (
                      <p className="mt-4 pt-4 border-t border-white/5 text-xs text-[#99948a] italic">
                        "{activeProduct.shortDescription}"
                      </p>
                    )}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8">
                <h3 className="serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Gauge size={18} className="text-gold" />
                  Technical Specifications
                </h3>

                {specs.length > 0 ? (
                  <div className="overflow-hidden rounded border border-white/10 bg-[#141412]">
                    <table className="w-full text-xs">
                      <tbody>
                        {specs.map((s, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-white/5 ${
                              idx % 2 === 0
                                ? "bg-[#171714]"
                                : "bg-[#141412]"
                            }`}
                          >
                            <td className="w-2/5 px-4 py-3 font-semibold text-[#aaa]">
                              {typeof s === "object"
                                ? s.key || `Parameter ${idx + 1}`
                                : `Parameter ${idx + 1}`}
                            </td>

                            <td className="px-4 py-3 text-white font-medium">
                              <span className="inline-flex items-center gap-2">
                                <CheckCircle2
                                  size={13}
                                  className="text-gold shrink-0"
                                />

                                {typeof s === "object"
                                  ? s.value || "—"
                                  : s}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-[#888] bg-[#141412] p-4 rounded border border-white/5">
                    Detailed laboratory technical data sheet and certificate of analysis (COA) available upon commercial request.
                  </p>
                )}
              </div>

            </div>

            {/* Commercial CTA */}
            <div className="mt-10 rounded border border-gold/30 bg-gold/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <h4 className="serif text-lg font-bold text-white">
                    Commercial Supply & Distributorship
                  </h4>

                  <p className="text-xs text-[#aaa] mt-1">
                    Wholesale volume pricing, bulk packaging, and delivery available for authorized stockists.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/contact"
                    className="gold-button text-xs"
                  >
                    Inquire for Supply <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/portal"
                    className="border border-gold/40 px-4 py-2.5 text-xs text-gold hover:bg-gold/10 transition"
                  >
                    Distributor Portal
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
