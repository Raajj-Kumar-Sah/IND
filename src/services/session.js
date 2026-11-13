import { setAccessToken, clearAccessToken } from "./authSession.js";

let session = null;

// Initialize session from memory or storage if present
const savedUser = sessionStorage.getItem("indira_user");
if (savedUser) {
  try {
    session = { user: JSON.parse(savedUser) };
  } catch {}
}

export const setSession = (value) => {
  session = value || null;
  setAccessToken(value?.accessToken || null);
  if (value?.refreshToken) {
    localStorage.setItem("indira_refresh_token", value.refreshToken);
  }
  if (value?.user) {
    sessionStorage.setItem("indira_user", JSON.stringify(value.user));
  }
};

export const getSession = () => session;

export const clearSession = () => {
  session = null;
  clearAccessToken();
  localStorage.removeItem("indira_refresh_token");
  sessionStorage.removeItem("indira_user");
};

export const allowedFor = (role) => ({
  admin: ["ADMIN", "SUPER_ADMIN"],
  hr: ["HR", "ADMIN", "SUPER_ADMIN"],
  distributor: ["DISTRIBUTOR"]
}[role] || []);
