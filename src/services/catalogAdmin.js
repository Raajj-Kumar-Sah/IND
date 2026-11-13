import { apiRequest } from "./api.js";

export const productAdminApi = {
  list: (params = {}) => apiRequest(`/products/admin?${new URLSearchParams(params)}`),
  create: (body) => apiRequest("/products", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => apiRequest(`/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  setActive: (id, isActive) => apiRequest(`/products/${id}/active`, { method: "PATCH", body: JSON.stringify({ isActive }) }),
  remove: (id) => apiRequest(`/products/${id}`, { method: "DELETE" }),
  uploadImages: async (id, files) => {
    const form = new FormData();
    [...files].forEach((file) => form.append("images", file));
    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products/${id}/images`, {
      method: "POST", body: form, credentials: "include",
      headers: (await import("./authSession.js")).getAccessToken() ? { Authorization: `Bearer ${(await import("./authSession.js")).getAccessToken()}` } : {}
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Image upload failed");
    return data;
  },
  removeImage: (id, imageId) => apiRequest(`/products/${id}/images/${imageId}`, { method: "DELETE" })
};

export const categoryAdminApi = {
  list: (params = {}) => apiRequest(`/categories?${new URLSearchParams(params)}`),
  create: (body) => apiRequest("/categories", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => apiRequest(`/categories/${id}`, { method: "PATCH", body: JSON.stringify(body) })
};

export const inventoryAdminApi = {
  list: (params = {}) => apiRequest(`/admin/inventory?${new URLSearchParams(params)}`),
  movements: (params = {}) => apiRequest(`/admin/inventory/movements?${new URLSearchParams(params)}`),
  adjust: (id, body) => apiRequest(`/admin/inventory/${id}/movements`, { method: "POST", body: JSON.stringify(body) })
};
