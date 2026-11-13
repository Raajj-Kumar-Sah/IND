import {useEffect,useState} from "react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import {apiRequest} from "../../services/api.js";
const money=n=>`₹${Number(n||0).toLocaleString("en-IN")}`;
export default function PaymentsManager(){
 const [items,setItems]=useState([]);const [status,setStatus]=useState("");const [error,setError]=useState("");
 async function load(){try{const r=await apiRequest(`/admin/payments?${new URLSearchParams(status?{status}:{})}`);setItems(r.data||[]);}catch(e){setError(e.message);}}
 useEffect(()=>{load();},[status]);
 const rows=items.map(p=>({date:new Date(p.createdAt).toLocaleString("en-IN"),order:p.order?.orderNumber||"—",distributor:p.distributor?.name||p.distributor?.email||"—",amount:money(p.amount),provider:p.provider,status:p.status,reference:p.providerPaymentId||p.providerOrderId||"—"}));
 return <><SectionHeading eyebrow="FINANCE" title="Payments" description="Review Razorpay payment attempts and their server-confirmed status."/><div className="mt-6 flex gap-3"><select className="dark-field" value={status} onChange={e=>setStatus(e.target.value)}><option value="">All payment statuses</option>{["CREATED","AUTHORIZED","CAPTURED","FAILED","REFUNDED"].map(x=><option key={x}>{x}</option>)}</select><button onClick={load} className="border border-white/20 px-4 text-xs">Refresh</button></div>{error&&<p className="mt-4 text-sm text-red-300">{error}</p>}<div className="mt-5"><DataTable columns={[{key:"date",label:"Date"},{key:"order",label:"Order"},{key:"distributor",label:"Distributor"},{key:"amount",label:"Amount"},{key:"provider",label:"Provider"},{key:"status",label:"Status"},{key:"reference",label:"Provider reference"}]} rows={rows}/></div><p className="mt-4 text-xs text-[#8e887d]">Payment status is reconciled by verified server callbacks and Razorpay webhooks. This screen does not allow manual marking as paid.</p></>;
}
