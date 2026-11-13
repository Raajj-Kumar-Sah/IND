import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  IndianRupee,
  PackageCheck,
  Clock3,
  Truck,
  FileText,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import StatCard from "../../components/StatCard.jsx";
import DataTable from "../../components/DataTable.jsx";
import { distributorOrdersApi } from "../../services/orders.js";

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function DistributorDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    distributorOrdersApi
      .list({ limit: 100 })
      .then((r) => setOrders(r.data.items || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const totalPurchases = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const completedOrders = orders.filter((o) => o.orderStatus === "DELIVERED").length;
  const pendingOrders = orders.filter((o) => ["PLACED", "CONFIRMED", "PROCESSING", "PACKED", "DISPATCHED", "OUT_FOR_DELIVERY"].includes(o.orderStatus)).length;
  const outstandingAmount = orders
    .filter((o) => o.paymentStatus !== "PAID" && o.paymentStatus !== "REFUNDED" && o.orderStatus !== "CANCELLED")
    .reduce((s, o) => s + (o.totalAmount || 0), 0);

  const rows = orders.slice(0, 6).map((o) => ({
    id: o.orderNumber,
    date: new Date(o.createdAt).toLocaleDateString("en-IN"),
    items: `${o.items?.length || 0} items`,
    total: money(o.totalAmount),
    payment: (
      <span
        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
          o.paymentStatus === "PAID"
            ? "bg-emerald-950/60 text-emerald-300"
            : o.paymentStatus === "REFUNDED"
            ? "bg-zinc-800 text-zinc-300"
            : "bg-amber-950/60 text-amber-300"
        }`}
      >
        {o.paymentStatus}
      </span>
    ),
    status: (
      <span
        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
          o.orderStatus === "DELIVERED"
            ? "bg-emerald-950/60 text-emerald-300"
            : o.orderStatus === "CANCELLED"
            ? "bg-red-950/60 text-red-300"
            : "bg-gold/10 text-gold"
        }`}
      >
        {o.orderStatus}
      </span>
    )
  }));

  return (
    <>
      <SectionHeading
        eyebrow="DISTRIBUTOR COMMERCE PORTAL"
        title="Distributor Operations Center"
        description="Monitor real-time purchase totals, order progress, pending payments, shipment tracking and verified tax invoices."
      />

      {loading && <p className="mt-4 text-xs text-[#aaa]">Loading commercial overview…</p>}
      {error && <p className="mt-4 text-xs text-red-300">{error}</p>}

      {/* Primary KPI Metrics as per Architecture Specification */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingCart} />
        <StatCard label="Pending Orders" value={pendingOrders} icon={Clock3} />
        <StatCard label="Completed Orders" value={completedOrders} icon={PackageCheck} />
        <StatCard label="Total Purchase Amount" value={money(totalPurchases)} icon={IndianRupee} />
        <StatCard label="Outstanding Payments" value={money(outstandingAmount)} icon={AlertCircle} />
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          to="/dashboard/distributor/catalog"
          className="flex flex-col justify-between border border-white/10 bg-[#171714] p-5 transition hover:border-gold/50"
        >
          <div>
            <div className="flex items-center justify-between text-gold">
              <ShoppingCart size={18} />
              <ArrowRight size={14} />
            </div>
            <h4 className="serif mt-3 text-lg font-bold">Product Catalogue & Bulk Orders</h4>
            <p className="mt-1 text-xs text-[#999]">
              Browse industrial lubricants, chemicals, and workwear with negotiated distributor unit pricing.
            </p>
          </div>
          <span className="mt-4 text-[11px] font-bold text-gold">START NEW ORDER →</span>
        </Link>

        <Link
          to="/dashboard/distributor/shipments"
          className="flex flex-col justify-between border border-white/10 bg-[#171714] p-5 transition hover:border-gold/50"
        >
          <div>
            <div className="flex items-center justify-between text-gold">
              <Truck size={18} />
              <ArrowRight size={14} />
            </div>
            <h4 className="serif mt-3 text-lg font-bold">Real-Time Order Tracking</h4>
            <p className="mt-1 text-xs text-[#999]">
              Track carrier shipments, dispatch timelines, estimated deliveries, and verify delivery with OTP.
            </p>
          </div>
          <span className="mt-4 text-[11px] font-bold text-gold">TRACK SHIPMENTS →</span>
        </Link>

        <Link
          to="/dashboard/distributor/orders"
          className="flex flex-col justify-between border border-white/10 bg-[#171714] p-5 transition hover:border-gold/50"
        >
          <div>
            <div className="flex items-center justify-between text-gold">
              <FileText size={18} />
              <ArrowRight size={14} />
            </div>
            <h4 className="serif mt-3 text-lg font-bold">Razorpay & Tax Invoices</h4>
            <p className="mt-1 text-xs text-[#999]">
              Settle outstanding balances securely via Razorpay and download PDF tax invoices.
            </p>
          </div>
          <span className="mt-4 text-[11px] font-bold text-gold">VIEW INVOICES & PAYMENTS →</span>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="serif text-2xl">Recent Orders</h3>
          <Link to="/dashboard/distributor/orders" className="text-xs text-gold underline">
            View all orders ({orders.length})
          </Link>
        </div>
        <DataTable
          columns={[
            { key: "id", label: "Order ID" },
            { key: "date", label: "Date" },
            { key: "items", label: "Items" },
            { key: "total", label: "Order Total" },
            { key: "payment", label: "Payment Status" },
            { key: "status", label: "Order Status" }
          ]}
          rows={rows}
        />
      </section>

      {/* Business Account & Support */}
      <div className="mt-8 border border-[#4b412f] bg-[#171613] p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-gold">
          <ShieldCheck size={16} /> AUTHORIZED DISTRIBUTOR ACCOUNT
        </div>
        <h3 className="serif mt-2 text-2xl">Account Manager & Direct Enterprise Support</h3>
        <p className="mt-2 text-xs leading-6 text-[#99948a]">
          Your orders are processed under Indira Industries distributor terms. For credit limit revisions, payment term extensions, or priority dispatch arrangements, please reach out to your designated regional desk.
        </p>
      </div>
    </>
  );
}
