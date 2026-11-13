import {apiRequest} from "./api.js";
export const securityApi={
 audit:(page=1)=>apiRequest(`/admin/security?page=${page}`),
 authEvents:(page=1)=>apiRequest(`/admin/security/auth-events?page=${page}`),
 users:(search="")=>apiRequest(`/admin/security/users?search=${encodeURIComponent(search)}`),
 setAccess:(id,isActive)=>apiRequest(`/admin/security/users/${id}/access`,{method:"PATCH",body:JSON.stringify({isActive})}),
 setRole:(id,role)=>apiRequest(`/admin/security/users/${id}/role`,{method:"PATCH",body:JSON.stringify({role})})
};
