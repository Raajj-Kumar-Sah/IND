import { useEffect, useState } from "react";
import { Search, Building2, CheckCircle2, XCircle, PauseCircle, RefreshCw, Eye, X } from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import { distributorsApi } from "../../services/distributors.js";

const statusLabel = (p) => p?.approvalStatus || "PENDING";
export default function DistributorsManager(){
 const [items,setItems]=useState([]);const [search,setSearch]=useState("");const [status,setStatus]=useState("");
 const [selected,setSelected]=useState(null);const [note,setNote]=useState("");const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");const [notice,setNotice]=useState("");
 async function load(){setError("");try{const r=await distributorsApi.list({search,status,limit:100});setItems(r.data.items||[]);}catch(e){setError(e.message);}}
 useEffect(()=>{load();},[search,status]);
 async function openDetail(id){setError("");try{const r=await distributorsApi.get(id);setSelected(r.data);setNote(r.data.profile?.approvalNote||"");}catch(e){setError(e.message);}}
 async function decision(next){if(!selected)return;setBusy(true);setError("");try{await distributorsApi.setApproval(selected._id,next,note);setNotice(`Distributor ${next.toLowerCase()}.`);setSelected(null);await load();}catch(e){setError(e.message);}finally{setBusy(false);}}
 async function activate(isActive){if(!selected)return;setBusy(true);setError("");try{await distributorsApi.setActive(selected._id,isActive);setNotice(isActive?"Distributor activated.":"Distributor deactivated.");const r=await distributorsApi.get(selected._id);setSelected(r.data);await load();}catch(e){setError(e.message);}finally{setBusy(false);}}
 const rows=items.map(u=>({name:<div><div className="font-medium">{u.name}</div><div className="text-[11px] text-[#8e887d]">{u.email}</div></div>,company:u.profile?.companyName||"—",phone:u.profile?.phone||"—",gstin:u.profile?.gstin||"—",approval:statusLabel(u.profile),verification:u.emailVerifiedAt?"Verified":"Unverified",account:u.isActive?"Active":"Inactive",action:<button onClick={()=>openDetail(u._id)} className="flex items-center gap-2 border border-white/20 px-3 py-2 text-xs"><Eye size={13}/> Manage</button>}));
 return <>
 <SectionHeading eyebrow="PARTNER NETWORK" title="Distributor management" description="Review distributor applications, maintain business profiles and control account access."/>
 <div className="mt-6 flex flex-wrap gap-3">
  <div className="flex min-w-56 items-center gap-2 border border-white/15 px-3"><Search size={15} className="text-[#8e887d]"/><input value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-transparent py-3 text-xs outline-none" placeholder="Search name or email"/></div>
  <select value={status} onChange={e=>setStatus(e.target.value)} className="dark-field"><option value="">All approval statuses</option>{["PENDING","APPROVED","REJECTED","SUSPENDED"].map(s=><option key={s}>{s}</option>)}</select>
  <button onClick={load} className="border border-white/20 px-3"><RefreshCw size={15}/></button>
 </div>
 {error&&<p className="mt-4 text-sm text-red-300">{error}</p>}{notice&&<p className="mt-4 text-sm text-emerald-300">{notice}</p>}
 <div className="mt-5"><DataTable columns={[{key:"name",label:"Distributor"},{key:"company",label:"Company"},{key:"phone",label:"Phone"},{key:"gstin",label:"GSTIN"},{key:"approval",label:"Approval"},{key:"verification",label:"Email"},{key:"account",label:"Account"},{key:"action",label:"Actions"}]} rows={rows}/></div>
 {selected&&<div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4"><div className="my-8 w-full max-w-2xl border border-white/15 bg-[#111] p-6">
  <div className="flex items-start justify-between"><div><div className="eyebrow">DISTRIBUTOR RECORD</div><h2 className="serif mt-2 text-2xl">{selected.profile?.companyName||selected.name}</h2><p className="mt-1 text-xs text-[#aaa]">{selected.email}</p></div><button onClick={()=>setSelected(null)}><X/></button></div>
  <div className="mt-6 grid gap-4 sm:grid-cols-2">{[["Contact person",selected.profile?.contactPerson],["Phone",selected.profile?.phone],["GSTIN",selected.profile?.gstin],["Business type",selected.profile?.businessType],["Email verification",selected.emailVerifiedAt?"Verified":"Not verified"],["Account",selected.isActive?"Active":"Inactive"],["Approval",statusLabel(selected.profile)],["Credit limit",`₹${selected.profile?.creditLimit||0}`]].map(([k,v])=><div className="border-b border-white/10 pb-3" key={k}><div className="text-[10px] uppercase tracking-wider text-[#888]">{k}</div><div className="mt-1 text-sm">{v||"Not provided"}</div></div>)}</div>
  <div className="mt-5"><div className="text-xs text-[#aaa]">Business address</div><p className="mt-2 text-sm">{[selected.profile?.address?.line1,selected.profile?.address?.line2,selected.profile?.address?.city,selected.profile?.address?.state,selected.profile?.address?.postalCode].filter(Boolean).join(", ")||"Not provided"}</p></div>
  <label className="mt-6 block text-xs text-[#aaa]">Internal approval note<textarea rows="3" maxLength="500" value={note} onChange={e=>setNote(e.target.value)} className="dark-field mt-2 w-full"/></label>
  {error&&<p className="mt-3 text-sm text-red-300">{error}</p>}
  <div className="mt-6 flex flex-wrap gap-2">
   <button disabled={busy} onClick={()=>decision("APPROVED")} className="gold-button"><CheckCircle2 size={14}/> Approve</button>
   <button disabled={busy} onClick={()=>decision("REJECTED")} className="border border-red-400/40 px-3 py-2 text-xs text-red-300"><XCircle size={14}/> Reject</button>
   <button disabled={busy} onClick={()=>decision("SUSPENDED")} className="border border-white/20 px-3 py-2 text-xs"><PauseCircle size={14}/> Suspend</button>
   {selected.profile?.approvalStatus==="APPROVED"&&<button disabled={busy||!selected.emailVerifiedAt} onClick={()=>activate(!selected.isActive)} className="border border-white/20 px-3 py-2 text-xs">{selected.isActive?"Deactivate":"Activate"}</button>}
  </div>
  {!selected.emailVerifiedAt&&<p className="mt-3 text-xs text-amber-300">This account cannot be activated until the email address is verified, even if approved.</p>}
 </div></div>}
 </>;
}
