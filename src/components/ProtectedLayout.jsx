import { Navigate } from "react-router-dom";
import { allowedFor,getSession } from "../services/session.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
export default function ProtectedLayout({role}){
 const s=getSession();
 return s && allowedFor(role).includes(s.user.role) ? <DashboardLayout role={role}/> : <Navigate to="/portal" replace/>;
}
