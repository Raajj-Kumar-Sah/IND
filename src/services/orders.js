import { apiRequest } from "./api.js";
export const distributorOrdersApi = {
  create: body => apiRequest("/distributor/orders",{method:"POST",body:JSON.stringify(body)}),
  list: params => apiRequest(`/distributor/orders?${new URLSearchParams(params||{})}`),
  get: id => apiRequest(`/distributor/orders/${id}`)
};
export const adminOrdersApi = {
  list: params => apiRequest(`/admin/orders?${new URLSearchParams(params||{})}`),
  get: id => apiRequest(`/admin/orders/${id}`),
  setStatus: (id,status,note="") => apiRequest(`/admin/orders/${id}/status`,{method:"PATCH",body:JSON.stringify({status,note})}),
  setShipment: (id,body) => apiRequest(`/admin/orders/${id}/shipment`,{method:"PATCH",body:JSON.stringify(body)})
};
