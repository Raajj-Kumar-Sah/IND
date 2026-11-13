import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import { publicCatalogApi } from "../../services/publicCatalog.js";
import { distributorOrdersApi } from "../../services/orders.js";

export default function DistributorCatalog(){
 const [products,setProducts]=useState([]);const [q,setQ]=useState("");const [division,setDivision]=useState("");
 const [cart,setCart]=useState({});const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [notice,setNotice]=useState("");
 async function load(){try{const r=await publicCatalogApi.list({search:q,division,limit:100});setProducts(r.data.items||[]);}catch(e){setError(e.message);}}
 useEffect(()=>{load();},[q,division]);
 const visible=useMemo(()=>products.filter(p=>!division||p.division===division),[products,division]);
 const cartItems=products.filter(p=>cart[p._id]>0);
 const total=cartItems.reduce((sum,p)=>sum+(p.distributorPrice??p.price)*cart[p._id],0);
 function setQty(id,qty){setCart(c=>({...c,[id]:Math.max(0,qty)}));}
 async function checkout(){setBusy(true);setError("");setNotice("");try{const result=await distributorOrdersApi.create({items:cartItems.map(p=>({productId:p._id,quantity:cart[p._id]}))});setNotice(`Order ${result.data.orderNumber} placed successfully. Stock has been reserved.`);setCart({});}catch(e){setError(e.message);}finally{setBusy(false);}}
 return <>
 <div className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="DISTRIBUTOR CATALOGUE" title="Browse products" description="Live catalogue, distributor pricing and stock availability."/><div className="flex items-center gap-2 border border-gold/30 px-4 py-3 text-xs text-gold"><ShoppingCart size={15}/> {cartItems.length} products · ₹{total.toLocaleString("en-IN")}</div></div>
 <div className="my-6 flex flex-wrap gap-3"><div className="flex min-w-56 items-center gap-2 border border-white/15 px-3"><Search size={15} className="text-[#8e887d]"/><input value={q} onChange={e=>setQ(e.target.value)} className="w-full bg-transparent py-3 text-xs outline-none" placeholder="Search products or SKU"/></div><select value={division} onChange={e=>setDivision(e.target.value)} className="dark-field"><option value="">All divisions</option>{["IINDLUBE","IINDPURE","IINDSTYL"].map(d=><option key={d}>{d}</option>)}</select></div>
 {error&&<p className="mb-4 text-sm text-red-300">{error}</p>}{notice&&<p className="mb-4 text-sm text-emerald-300">{notice}</p>}
 <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
  {visible.map(p => {
    const imgUrl = p.images?.[0]?.url;
    return (
      <article key={p._id} className="border border-white/10 bg-[#171714] p-5 flex flex-col justify-between">
        <div>
          <div className="h-44 w-full overflow-hidden rounded border border-white/5 bg-[#121210] mb-4 flex items-center justify-center">
            {imgUrl ? (
              <img src={imgUrl} alt={p.images?.[0]?.alt || p.name} className="h-full w-full object-contain p-2" />
            ) : (
              <div className="text-[11px] text-[#666]">No image available</div>
            )}
          </div>
          <div className="eyebrow">{p.division} / {p.category?.name || "Catalogue"}</div>
          <h3 className="serif mt-2 text-xl font-bold">{p.name}</h3>
          <p className="mt-2 text-xs text-[#99948a] line-clamp-2">{p.shortDescription || p.description}</p>
        </div>
        <div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-[#99948a]">{p.sku} · {p.brand}</span>
            <span className={p.stockQuantity > 0 ? "text-emerald-300 font-medium" : "text-red-300"}>
              {p.stockQuantity > 0 ? `${p.stockQuantity} available` : "Out of stock"}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <div>
              <div className="text-lg font-bold text-gold">₹{(p.distributorPrice ?? p.price).toLocaleString("en-IN")}</div>
              <div className="text-[10px] text-[#99948a]">Distributor price / unit</div>
            </div>
            <div className="flex items-center gap-2">
              <button disabled={!cart[p._id]} onClick={() => setQty(p._id, (cart[p._id] || 0) - 1)} className="border border-white/20 p-2 disabled:opacity-30">
                <Minus size={13} />
              </button>
              <span className="min-w-5 text-center text-xs font-semibold">{cart[p._id] || 0}</span>
              <button disabled={p.stockQuantity <= (cart[p._id] || 0)} onClick={() => setQty(p._id, (cart[p._id] || 0) + 1)} className="border border-white/20 p-2 disabled:opacity-30">
                <Plus size={13} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  })}
 </div>
 {cartItems.length>0&&<div className="mt-8 border border-gold/30 bg-[#171714] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="serif text-xl">Bulk order summary</h3><button onClick={()=>setCart({})} className="flex items-center gap-2 text-xs text-red-300"><Trash2 size={13}/> Clear cart</button></div><div className="mt-4 space-y-2">{cartItems.map(p=><div key={p._id} className="flex justify-between border-b border-white/10 py-2 text-xs"><span>{p.name} × {cart[p._id]}</span><span>₹{((p.distributorPrice??p.price)*cart[p._id]).toLocaleString("en-IN")}</span></div>)}</div><div className="mt-4 flex items-center justify-between"><span className="text-xs text-[#aaa]">Subtotal (tax/shipping calculated separately)</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><button disabled={busy} onClick={checkout} className="gold-button mt-5 w-full justify-center">{busy?"Placing order...":"Place order"}</button><p className="mt-3 text-[10px] text-[#8e887d]">Prices and stock are revalidated by the server during checkout. Payment is not collected in this step.</p></div>}
 </>;
}
