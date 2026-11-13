import { apiRequest } from "./api.js";
import { getAccessToken } from "./authSession.js";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const analyticsApi = {
  dashboard: (params) =>
    apiRequest(`/admin/analytics/dashboard?${new URLSearchParams(params || {})}`),

  export: async (kind, params = {}, format = "xlsx") => {
    const query = new URLSearchParams({ ...params, format });
    const response = await fetch(`${BASE}/admin/analytics/exports/${kind}?${query}`, {
      headers: getAccessToken() ? { Authorization: `Bearer ${getAccessToken()}` } : {},
      credentials: "include"
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Export failed");
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const ext = format === "xlsx" || format === "excel" ? "xlsx" : "csv";
    const a = document.createElement("a");
    a.href = url;
    a.download = `indira-${kind}-${new Date().toISOString().slice(0, 10)}.${ext}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
};
