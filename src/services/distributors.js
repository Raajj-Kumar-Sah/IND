import { apiRequest } from "./api.js";

export const distributorsApi = {
  list: (params = {}) => apiRequest(`/admin/distributors?${new URLSearchParams(params)}`),
  get: (id) => apiRequest(`/admin/distributors/${id}`),
  updateProfile: (id, body) => apiRequest(`/admin/distributors/${id}/profile`, { method: "PATCH", body: JSON.stringify(body) }),
  setApproval: (id, status, note = "") => apiRequest(`/admin/distributors/${id}/approval`, { method: "PATCH", body: JSON.stringify({ status, note }) }),
  setActive: (id, isActive) => apiRequest(`/admin/distributors/${id}/active`, { method: "PATCH", body: JSON.stringify({ isActive }) })
};
