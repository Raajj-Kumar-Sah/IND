import {apiRequest} from "./api.js";
export const adminShipmentsApi={
 list:(params={})=>apiRequest(`/admin/shipments?${new URLSearchParams(params)}`),
 register:(orderId,body)=>apiRequest(`/admin/shipments/${orderId}`,{method:"POST",body:JSON.stringify(body)}),
 setStatus:(orderId,status,note="",reason="")=>apiRequest(`/admin/shipments/${orderId}/status`,{method:"PATCH",body:JSON.stringify({status,note,reason})})
};
export const distributorShipmentsApi={
 list:()=>apiRequest("/distributor/shipments"),
 get:orderId=>apiRequest(`/distributor/shipments/${orderId}`),
 confirm:(orderId,otp)=>apiRequest(`/distributor/shipments/${orderId}/confirm-delivery`,{method:"POST",body:JSON.stringify({otp})})
};
