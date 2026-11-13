import {apiRequest} from "./api.js";
export const publicCatalogApi={
 list:(params={})=>apiRequest(`/products?${new URLSearchParams(params)}`),
 getBySlug:slug=>apiRequest(`/products/slug/${encodeURIComponent(slug)}`)
};
