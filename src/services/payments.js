import {apiRequest} from "./api.js";
const API_BASE=import.meta.env.VITE_API_URL||"http://localhost:5000/api";
export const paymentsApi={
 createRazorpayOrder:orderId=>apiRequest(`/distributor/payments/orders/${orderId}/razorpay-order`,{method:"POST"}),
 verify:body=>apiRequest("/distributor/payments/verify",{method:"POST",body:JSON.stringify(body)}),
 mine:()=>apiRequest("/distributor/payments"),
 downloadInvoice:async orderId=>{
  const {getAccessToken}=await import("./authSession.js");
  const r=await fetch(`${API_BASE}/invoices/order/${orderId}/pdf`,{headers:getAccessToken()?{Authorization:`Bearer ${getAccessToken()}`}:{},credentials:"include"});
  if(!r.ok){const d=await r.json().catch(()=>({}));throw new Error(d.message||"Invoice download failed");}
  const blob=await r.blob();const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="Indira-Invoice.pdf";a.click();URL.revokeObjectURL(url);
 }
};
let razorpayScriptPromise;
function ensureRazorpayScript(){
 if(window.Razorpay)return Promise.resolve();
 if(!razorpayScriptPromise){
  razorpayScriptPromise=new Promise((resolve,reject)=>{
   const script=document.createElement("script");
   script.src="https://checkout.razorpay.com/v1/checkout.js";
   script.async=true;
   script.onload=()=>window.Razorpay?resolve():reject(new Error("Razorpay Checkout failed to initialize"));
   script.onerror=()=>reject(new Error("Unable to load Razorpay Checkout. Check your connection."));
   document.head.appendChild(script);
  });
 }
 return razorpayScriptPromise;
}
export async function openRazorpayCheckout(options){
 await ensureRazorpayScript();
 return new Promise((resolve,reject)=>{
  const checkout=new window.Razorpay({...options,handler:resolve,modal:{ondismiss:()=>reject(new Error("Payment window closed"))}});
  checkout.on("payment.failed",response=>reject(new Error(response.error?.description||"Payment failed")));
  checkout.open();
 });
}
