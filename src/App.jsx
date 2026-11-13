import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Brands from "./pages/public/Brands.jsx";
import Products from "./pages/public/Products.jsx";
import PartnerWithUs from "./pages/public/PartnerWithUs.jsx";
import Contact from "./pages/public/Contact.jsx";
import Careers from "./pages/public/Careers.jsx";
import Division from "./pages/public/Division.jsx";
import ProductDetails from "./pages/public/ProductDetails.jsx";
import PortalLogin from "./pages/public/PortalLogin.jsx";
import VerifyEmail from "./pages/public/VerifyEmail.jsx";
import ResetPassword from "./pages/public/ResetPassword.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import HrDashboard from "./pages/hr/HrDashboard.jsx";
import DistributorDashboard from "./pages/distributor/DistributorDashboard.jsx";
import JobsManager from "./pages/hr/JobsManager.jsx";
import ApplicationsManager from "./pages/hr/ApplicationsManager.jsx";
import InterviewsManager from "./pages/hr/InterviewsManager.jsx";
import ProductsManager from "./pages/admin/ProductsManager.jsx";
import OrdersManager from "./pages/admin/OrdersManager.jsx";
import PaymentsManager from "./pages/admin/PaymentsManager.jsx";
import InventoryManager from "./pages/admin/InventoryManager.jsx";
import DistributorsManager from "./pages/admin/DistributorsManager.jsx";
import Reports from "./pages/admin/Reports.jsx";
import DocumentsManager from "./pages/admin/DocumentsManager.jsx";
import DistributorCatalog from "./pages/distributor/DistributorCatalog.jsx";
import DistributorOrders from "./pages/distributor/DistributorOrders.jsx";
import Account from "./pages/distributor/Account.jsx";
import NotFound from "./pages/NotFound.jsx";
import Notifications from "./pages/shared/Notifications.jsx";
import SecurityCenter from "./pages/admin/SecurityCenter.jsx";
import ShipmentsManager from "./pages/admin/ShipmentsManager.jsx";
import ShipmentTracking from "./pages/distributor/ShipmentTracking.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/products" element={<Products />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/portal" element={<PortalLogin />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/:division" element={<Division />} />
      </Route>

      <Route path="/dashboard/admin" element={<ProtectedLayout role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="orders" element={<OrdersManager />} />
        <Route path="shipments" element={<ShipmentsManager />} />
        <Route path="payments" element={<PaymentsManager />} />
        <Route path="inventory" element={<InventoryManager />} />
        <Route path="distributors" element={<DistributorsManager />} />
        <Route path="reports" element={<Reports />} />
        <Route path="documents" element={<DocumentsManager />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="security" element={<SecurityCenter />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

      <Route path="/dashboard/hr" element={<ProtectedLayout role="hr" />}>
        <Route index element={<HrDashboard />} />
        <Route path="jobs" element={<JobsManager />} />
        <Route path="applications" element={<ApplicationsManager />} />
        <Route path="interviews" element={<InterviewsManager />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      <Route path="/dashboard/distributor" element={<ProtectedLayout role="distributor" />}>
        <Route index element={<DistributorDashboard />} />
        <Route path="catalog" element={<DistributorCatalog />} />
        <Route path="orders" element={<DistributorOrders />} />
        <Route path="shipments" element={<ShipmentTracking />} />
        <Route path="account" element={<Account />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
