import {apiRequest} from "./api.js";
export const notificationsApi={
 list:({unread=false,page=1}={})=>apiRequest(`/notifications?unread=${unread}&page=${page}`),
 markRead:id=>apiRequest(`/notifications/${id}/read`,{method:"PATCH"}),
 markAllRead:()=>apiRequest("/notifications/read-all",{method:"POST"})
};
