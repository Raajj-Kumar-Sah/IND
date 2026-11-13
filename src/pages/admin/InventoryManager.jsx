import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import { inventoryAdminApi } from "../../services/catalogAdmin.js";

export default function InventoryManager(){
 const [data,setData]=useState({items:[],summary:{trackedSkus:0,lowStock:0,outOfStock:0}});
 const [filter,setFilter]=useState("");
 const [movements,setMovements]=useState([]);
 const [selected,setSelected]=useState(null);
 const [form,setForm]=useState({type:"IN",quantity:"1",reason:"Purchase received",reference:""});
 const [error,setError]=useState("");const [notice,setNotice]=useState("");const [busy,setBusy]=useState(false);
 async function load(){try{const [inventory,history]=await Promise.all([inventoryAdminApi.list(filter?{stock:filter}:{}),inventoryAdminApi.movements({limit:100})]);setData(inventory.data);setMovements(history.data||[]);}catch(e){setError(e.message);}}
 useEffect(()=>{load();},[filter]);
 async function submit(e){e.preventDefault();setBusy(true);setError("");try{await inventoryAdminApi.adjust(selected._id,{...form,quantity:Number(form.quantity)});setNotice("Stock movement recorded.");setSelected(null);await load();}catch(e){setError(e.message);}finally{setBusy(false);}}
 const rows=data.items.map(p=>({sku:p.sku,product:p.name,division:p.division,stock:p.stockQuantity,threshold:p.reorderLevel,status:p.stockQuantity===0?"Out of stock":p.stockQuantity<=p.reorderLevel?"Low stock":"Healthy",action:<button onClick={()=>{setSelected(p);setForm({type:"IN",quantity:"1",reason:"Purchase received",reference:""});}} className="border border-white/20 px-3 py-2 text-xs">Adjust stock</button>}));
 const historyRows=movements.map(m=>({date:new Date(m.createdAt).toLocaleString(),sku:m.product?.sku||"—",product:m.product?.name||"—",type:m.type,change:m.type==="OUT"?`-${m.quantity}`:m.type==="ADJUSTMENT"?`→ ${m.newQuantity}`:`+${m.quantity}`,reason:m.reason}));
 return <>
 <SectionHeading eyebrow="SUPPLY OPERATIONS" title="Inventory control" description="Track available quantities, reorder thresholds and every stock movement."/>
 <div className="mt-7 grid gap-4 sm:grid-cols-3">{[["Tracked SKUs",data.summary.trackedSkus],["Low stock",data.summary.lowStock],["Out of stock",data.summary.outOfStock]].map(x=><div className="stat-card" key={x[0]}><div className="text-xs text-[#99948a]">{x[0]}</div><div className="serif mt-3 text-3xl">{x[1]}</div></div>)}</div>
 <div className="mt-7 flex flex-wrap items-center justify-between gap-3"><h3 className="serif text-xl">Stock overview</h3><div className="flex gap-2"><select className="dark-field" value={filter} onChange={e=>setFilter(e.target.value)}><option value="">All stock</option><option value="low">Low stock</option><option value="out">Out of stock</option><option value="healthy">Healthy</option></select><button onClick={load} className="border border-white/20 p-3"><RefreshCw size={15}/></button></div></div>
 {error&&<p className="mt-3 text-sm text-red-300">{error}</p>}{notice&&<p className="mt-3 text-sm text-emerald-300">{notice}</p>}
 <div className="mt-4"><DataTable columns={[{key:"sku",label:"SKU"},{key:"product",label:"Product"},{key:"division",label:"Division"},{key:"stock",label:"Available"},{key:"threshold",label:"Reorder level"},{key:"status",label:"Stock status"},{key:"action",label:"Action"}]} rows={rows}/></div>
 <div className="mt-10"><h3 className="serif mb-4 text-xl">Stock movement history</h3><DataTable columns={[{key:"date",label:"Date"},{key:"sku",label:"SKU"},{key:"product",label:"Product"},{key:"type",label:"Movement"},{key:"change",label:"Quantity"},{key:"reason",label:"Reason"}]} rows={historyRows}/></div>
 {selected&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"><form onSubmit={submit} className="w-full max-w-lg border border-white/15 bg-[#111] p-6"><h3 className="serif text-2xl">Adjust {selected.name}</h3><p className="mt-1 text-xs text-[#aaa]">Current available stock: {selected.stockQuantity}</p><div className="mt-5 grid gap-4"><label className="text-xs text-[#aaa]">Movement type<select className="dark-field mt-2 w-full" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="IN">Stock in</option><option value="OUT">Stock out</option><option value="ADJUSTMENT">Set exact quantity</option></select></label><label className="text-xs text-[#aaa]">Quantity<input required min="1" type="number" className="dark-field mt-2 w-full" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})}/></label><label className="text-xs text-[#aaa]">Reason<input required maxLength="300" className="dark-field mt-2 w-full" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/></label><label className="text-xs text-[#aaa]">Reference (optional)<input className="dark-field mt-2 w-full" value={form.reference} onChange={e=>setForm({...form,reference:e.target.value})}/></label></div>{error&&<p className="mt-3 text-sm text-red-300">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={()=>setSelected(null)} className="border border-white/20 px-4 py-3 text-xs">Cancel</button><button disabled={busy} className="gold-button">{busy?"Saving...":"Record movement"}</button></div></form></div>}
 </>;
}
