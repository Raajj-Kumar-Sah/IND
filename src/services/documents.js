import { apiRequest } from "./api.js";
import { getAccessToken } from "./authSession.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const publicDocumentApi = {
  list: () => apiRequest("/documents/public"),
  getDownloadUrl: (key) => `${API_BASE}/documents/download/${key}`,
  submitPartnership: (body) =>
    apiRequest("/documents/partnership-inquiry", {
      method: "POST",
      body: JSON.stringify(body)
    })
};

export const adminDocumentApi = {
  list: () => apiRequest("/admin/documents"),
  upload: async (key, file, metadata = {}) => {
    const form = new FormData();
    form.append("file", file);
    if (metadata.title) form.append("title", metadata.title);
    if (metadata.description) form.append("description", metadata.description);
    if (metadata.category) form.append("category", metadata.category);
    if (metadata.division) form.append("division", metadata.division);

    const token = getAccessToken();
    const response = await fetch(`${API_BASE}/admin/documents/upload/${key}`, {
      method: "POST",
      body: form,
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Document upload failed");
    return data;
  },
  reset: (key) =>
    apiRequest(`/admin/documents/${key}`, {
      method: "DELETE"
    })
};
