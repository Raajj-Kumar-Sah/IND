import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import { distributorOrdersApi } from "../../services/orders.js";
import { paymentsApi, openRazorpayCheckout } from "../../services/payments.js";
const money=n=>`₹${Number(n||0).toLocaleString("en-IN")}`;
export default function DistributorOrders(){
 const [items,setItems]=useState([]);const [selected,setSelected]=useState(null);const [error,setError]=useState("");const [busy,setBusy]=useState(false);const [notice,setNotice]=useState("");
 async function load(){try{const r=await distributorOrdersApi.list({limit:50});setItems(r.data.items||[]);}catch(e){setError(e.message);}}
 useEffect(()=>{load();},[]);
 async function detail(id){try{const r=await distributorOrdersApi.get(id);setSelected(r.data);}catch(e){setError(e.message);}}
 async function payNow(order){
  setBusy(true);setError("");setNotice("");
  try{
   const created=await paymentsApi.createRazorpayOrder(order._id);
   const result=await openRazorpayCheckout({key:created.data.keyId,amount:created.data.amount,currency:created.data.currency,name:"Indira Industries",description:`Payment for ${created.data.orderNumber}`,order_id:created.data.razorpayOrderId,prefill:{},theme:{color:"#c6a56a"}});
   const verified=await paymentsApi.verify(result);
   setNotice(verified.data.message||"Payment status updated.");await load();const fresh=await distributorOrdersApi.get(order._id);setSelected(fresh.data);
  }catch(e){setError(e.message);await load();}finally{setBusy(false);}
 }
 const rows=items.map(o=>({id:o.orderNumber,date:new Date(o.createdAt).toLocaleDateString("en-IN"),amount:money(o.totalAmount),payment:o.paymentStatus,status:o.orderStatus,action:<button onClick={()=>detail(o._id)} className="border border-white/20 px-3 py-2 text-xs">Details</button>}));
 return <><SectionHeading eyebrow="ORDER HISTORY" title="My orders" description="View your own orders, line items and shipment tracking."/><p className="mt-5 text-sm text-red-300">{error}</p><p className="mt-2 text-sm text-emerald-300">{notice}</p><div className="mt-7"><DataTable columns={[{key:"id",label:"Order ID"},{key:"date",label:"Date"},{key:"amount",label:"Amount"},{key:"payment",label:"Payment"},{key:"status",label:"Status"},{key:"action",label:""}]} rows={rows}/></div>
 {selected&&<div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4"><div className="my-8 w-full max-w-2xl border border-white/15 bg-[#111] p-6"><div className="flex justify-between"><div><div className="eyebrow">ORDER DETAILS</div><h2 className="serif mt-2 text-2xl">{selected.orderNumber}</h2></div><button onClick={()=>setSelected(null)}>✕</button></div><div className="mt-5 space-y-3">{selected.items.map(i=><div key={i.sku} className="flex justify-between border-b border-white/10 py-2 text-sm"><span>{i.name} × {i.quantity}</span><span>{money(i.lineTotal)}</span></div>)}</div><div className="mt-4 flex justify-between"><strong>Total</strong><strong>{money(selected.totalAmount)}</strong></div>
 <div className="mt-4 flex flex-wrap gap-2">{selected.paymentStatus!=="PAID"&&selected.paymentStatus!=="REFUNDED"&&selected.orderStatus!=="CANCELLED"&&<button disabled={busy} onClick={()=>payNow(selected)} className="gold-button">{busy?"Processing...":"Pay securely with Razorpay"}</button>}{selected.paymentStatus==="PAID"&&<button onClick={()=>paymentsApi.downloadInvoice(selected._id).catch(e=>setError(e.message))} className="border border-white/20 px-3 py-2 text-xs">Download invoice PDF</button>}</div><div className="mt-6"><h3 className="font-semibold">Order progress</h3><div className="mt-3 space-y-3">{selected.statusHistory.map((h,i)=><div key={i} className="border-l border-gold/50 pl-3"><div className="text-sm">{h.status}</div><div className="text-xs text-[#888]">{new Date(h.changedAt).toLocaleString("en-IN")} · {h.note}</div></div>)}</div></div>{selected.shipment?.trackingNumber&&<div className="mt-5 border border-white/10 p-4 text-sm">Carrier: {selected.shipment.carrier}<br/>Tracking: {selected.shipment.trackingNumber}{selected.shipment.trackingUrl&&<><br/><a className="text-gold underline" href={selected.shipment.trackingUrl} target="_blank" rel="noreferrer">Track shipment</a></>}</div>}</div></div>}
 </>;
}
