import { Outlet, NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  Boxes,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Bell,
  ShieldCheck,
  Truck,
  Users,
  UserRound,
  LogOut,
  ChevronRight,
  Menu,
  X,
  FileText,
  UserCog
} from "lucide-react";
import { useState } from "react";
import { clearSession, getSession } from "../services/session.js";

const config = {
  admin: {
    title: "Administration",
    base: "/dashboard/admin",
    links: [
      ["Overview", "", LayoutDashboard],
      ["Products", "products", Package],
      ["Distributors", "distributors", Users],
      ["Orders", "orders", ShoppingCart],
      ["Shipments", "shipments", Truck],
      ["Payments", "payments", CreditCard],
      ["Inventory", "inventory", Boxes],
      ["Reports", "reports", BarChart3],
      ["Documents & Partners", "documents", FileText],
      ["Notifications", "notifications", Bell],
      ["Security center", "security", ShieldCheck],
      ["User Management", "users", UserCog]
    ]
  },
  hr: {
    title: "People & Culture",
    base: "/dashboard/hr",
    links: [
      ["Overview", "", LayoutDashboard],
      ["Job postings", "jobs", BriefcaseBusiness],
      ["Applications", "applications", Users],
      ["Interviews", "interviews", CalendarDays],
      ["Notifications", "notifications", Bell]
    ]
  },
  distributor: {
    title: "Distributor workspace",
    base: "/dashboard/distributor",
    links: [
      ["Overview", "", LayoutDashboard],
      ["Product catalogue", "catalog", Package],
      ["My orders", "orders", ShoppingCart],
      ["Shipments", "shipments", Truck],
      ["Account", "account", UserRound],
      ["Notifications", "notifications", Bell]
    ]
  }
};

export default function DashboardLayout({ role }) {
  const c = config[role];
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const user = getSession()?.user;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const current =
    c.links.find(
      (x) => loc.pathname === `${c.base}/${x[1]}` || (!x[1] && loc.pathname === c.base)
    )?.[0] || c.title;

  return (
    <div className="min-h-screen bg-[#10100f] text-[#f4f0e8] md:flex">
      <aside
        className={`${
          open ? "fixed inset-y-0 left-0 z-50 block" : "hidden"
        } w-[260px] shrink-0 border-r border-white/10 bg-[#151512] md:sticky md:top-0 md:block md:h-screen overflow-y-auto`}
      >
        <div className="flex h-[80px] items-center justify-between border-b border-white/10 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-9 w-9 rounded-full border border-gold/50 object-contain"
            />
            <div>
              <span className="serif text-lg font-bold tracking-widest text-gold">INDIRA</span>
              <span className="block text-[8px] tracking-[.25em] text-[#888]">INDUSTRIES</span>
            </div>
          </Link>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="px-5 py-5 border-b border-white/5">
          <div className="eyebrow">PORTAL WORKSPACE</div>
          <div className="mt-1 text-sm font-semibold text-white">{c.title}</div>
          {isSuperAdmin && (
            <span className="mt-2 inline-block rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-gold">
              ✦ SUPER ADMIN
            </span>
          )}
        </div>

        <nav className="grid gap-1 px-3 py-4">
          {c.links
            // Hide "User Management" for non-super-admin users
            .filter(([label]) => label !== "User Management" || isSuperAdmin)
            .map(([label, path, Icon]) => (
            <NavLink
              end
              key={path}
              to={`${c.base}/${path}`}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-xs transition ${
                  isActive
                    ? "bg-[#2b261c] text-gold font-semibold"
                    : "text-[#aaa59b] hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 mt-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#99948a] hover:text-gold transition"
          >
            <LogOut size={15} /> Back to website
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[80px] items-center justify-between border-b border-white/10 bg-[#10100f]/95 px-5 backdrop-blur md:px-9">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gold" onClick={() => setOpen(true)}>
              <Menu />
            </button>
            <div className="text-sm font-semibold">{current}</div>
            <ChevronRight size={14} className="text-[#777269]" />
            <span className="text-[10px] tracking-widest text-[#8b857a] uppercase font-bold">
              {isSuperAdmin ? "SUPER ADMIN" : role}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="text-xs font-semibold">{user?.name || "Workspace user"}</div>
              <div className="text-[10px] text-[#898378]">{user?.email || role.toUpperCase()}</div>
            </div>

            <button
              onClick={() => {
                clearSession();
                navigate("/portal", { replace: true });
              }}
              className="border border-white/15 px-3 py-2 text-[10px] text-[#c9c2b5] hover:border-gold hover:text-gold transition"
            >
              Sign out
            </button>

            <img
              src="/logo.jpg"
              alt="Avatar"
              className="h-8 w-8 rounded-full border border-gold/40 object-contain"
            />
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] p-3 sm:p-5 md:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
