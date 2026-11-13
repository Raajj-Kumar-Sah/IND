import { Link } from "react-router-dom";
import { ArrowUpRight, Package } from "lucide-react";

export default function ProductCard({ product }) {
  const category = typeof product.category === "object" ? product.category?.name : product.category;
  const description = product.desc || product.shortDescription || product.description || "Explore product specifications and availability.";
  const code = product.code || product.sku || "";
  const image = product.images?.[0]?.url || product.image;

  return (
    <article className="group border border-white/10 bg-[#171714] transition hover:-translate-y-1 hover:border-gold/50 flex flex-col justify-between">
      <div>
        <div className="flex h-52 items-center justify-center overflow-hidden bg-[radial-gradient(circle,rgba(199,166,106,.12),transparent_65%),#1c1b17] p-3">
          {image ? (
            <img
              src={image}
              alt={product.images?.[0]?.alt || product.name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 text-gold">
              <Package size={38} strokeWidth={1} />
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="text-[9px] font-bold tracking-[.16em] text-gold">{category || "PRODUCT"}</div>
          <h3 className="serif mt-2 text-xl font-bold text-white group-hover:text-gold transition-colors">{product.name}</h3>
          <p className="mt-2 min-h-[42px] text-xs leading-5 text-[#99948a] line-clamp-2">{description}</p>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-[10px] text-[#aaa59b]">{product.pack || "Product"} · {code}</span>
            <Link to={`/products/${product.slug || product.id || product._id}`} aria-label={`View ${product.name}`} className="text-gold hover:text-white transition">
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
