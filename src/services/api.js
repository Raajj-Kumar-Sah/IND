import { clearSession, setSession, getSession } from "./session.js";
import { getAccessToken, setAccessToken } from "./authSession.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

export async function apiRequest(path, options = {}) {
  const token = getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include"
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && !path.startsWith("/auth/")) {
      const storedRefreshToken = localStorage.getItem("indira_refresh_token");
      if (storedRefreshToken && !isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
            credentials: "include"
          });
          const refreshData = await refreshRes.json();
          if (refreshRes.ok && refreshData.data?.accessToken) {
            setSession(refreshData.data);
            isRefreshing = false;
            onRefreshed(refreshData.data.accessToken);

            // Retry original request with new token
            return apiRequest(path, {
              ...options,
              headers: {
                ...headers,
                Authorization: `Bearer ${refreshData.data.accessToken}`
              }
            });
          }
        } catch {
          // Refresh failed
        }
        isRefreshing = false;
      }
      clearSession();
    }
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export const careersApi = {
  listJobs: () => apiRequest("/jobs"),
  getJob: (id) => apiRequest(`/jobs/${id}`),
  apply: (formData) =>
    fetch(`${API_BASE}/applications`, {
      method: "POST",
      body: formData,
      credentials: "include"
    }).then(async (r) => {
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || "Application failed");
      return d;
    })
};

export const authApi = {
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
  registerDistributor: (data) =>
    apiRequest("/auth/register-distributor", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  refresh: (refreshToken) =>
    apiRequest("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    }),
  logout: () => {
    const refreshToken = localStorage.getItem("indira_refresh_token");
    if (refreshToken) {
      apiRequest("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken })
      }).catch(() => {});
    }
    clearSession();
  },
  forgotPassword: (email) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email })
    }),
  resetPassword: (token, password) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password })
    }),
  verifyEmail: (token) =>
    apiRequest("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token })
    })
};
