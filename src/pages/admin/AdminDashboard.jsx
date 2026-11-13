import { useEffect, useState } from "react";
import {
  Users,
  IndianRupee,
  ShoppingBag,
  AlertTriangle,
  Clock,
  TrendingUp,
  Package,
  CheckCircle2
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import SectionHeading from "../../components/SectionHeading.jsx";
import StatCard from "../../components/StatCard.jsx";
import DataTable from "../../components/DataTable.jsx";
import { analyticsApi } from "../../services/analytics.js";

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const PIE_COLORS = ["#d1b477", "#8e7b54", "#e5d3a9", "#4a402d", "#c59b27"];

const CustomTooltip = ({ active, payload, label, prefix = "₹" }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-white/20 bg-[#191916] p-2.5 text-xs shadow-xl">
        <div className="font-semibold text-gold">{label || payload[0]?.name}</div>
        <div className="mt-1 text-white">
          {prefix}
          {Number(payload[0]?.value || 0).toLocaleString("en-IN")}
        </div>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi
      .dashboard()
      .then((r) => setData(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};
  const monthly = data?.monthly || [];
  const monthlyOrders = data?.monthlyOrders || [];
  const distributorSales = data?.distributorSales || [];
  const productSales = data?.productSales || [];
  const orderStatusDistribution = data?.orderStatusDistribution || [];

  const rows = (data?.recentOrders || []).map((o) => ({
    id: o.orderNumber,
    customer: o.distributorSnapshot?.companyName || "—",
    amount: money(o.totalAmount),
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
    ),
    date: new Date(o.createdAt).toLocaleDateString("en-IN")
  }));

  return (
    <>
      <SectionHeading
        eyebrow="ENTERPRISE CONTROL"
        title="Business Intelligence Dashboard"
        description="Comprehensive real-time platform metrics, sales analytics, inventory status and fulfillment pipelines."
      />

      {loading && <p className="mt-5 text-sm text-[#aaa]">Aggregating platform intelligence…</p>}
      {error && <p className="mt-5 text-sm text-red-300">{error}</p>}

      {/* Primary KPI Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Distributors"
          value={stats.distributors ?? "—"}
          subtext={`${stats.activeDistributors ?? 0} active · ${stats.pendingDistributors ?? 0} pending`}
          icon={Users}
        />
        <StatCard
          label="Total Revenue"
          value={data ? money(stats.totalRevenue || stats.collectedRevenue) : "—"}
          subtext={`${money(stats.collectedRevenue)} collected in 12m`}
          icon={IndianRupee}
        />
        <StatCard
          label="Orders Volume"
          value={stats.orders ?? "—"}
          subtext={`${stats.pendingOrders ?? 0} pending processing`}
          icon={ShoppingBag}
        />
        <StatCard
          label="Inventory Health"
          value={`${stats.lowStock ?? 0} Low`}
          subtext={`${stats.outStock ?? 0} Out of stock`}
          icon={AlertTriangle}
        />
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue - Line Chart */}
        <section className="border border-white/10 bg-[#171714] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">FINANCIAL REVENUE</div>
              <h3 className="serif mt-1 text-xl">Monthly Revenue (Line chart)</h3>
            </div>
            <TrendingUp size={18} className="text-gold" />
          </div>
          <div className="mt-6 h-64 w-full">
            {monthly.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262624" />
                  <XAxis dataKey="month" stroke="#777" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#777" tick={{ fontSize: 10 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#d1b477"
                    strokeWidth={2.5}
                    dot={{ fill: "#d1b477", r: 4 }}
                    activeDot={{ r: 6, fill: "#ffffff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[#888]">
                No payment data in this period
              </div>
            )}
          </div>
        </section>

        {/* Monthly Orders - Bar Chart */}
        <section className="border border-white/10 bg-[#171714] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">ORDER VOLUME</div>
              <h3 className="serif mt-1 text-xl">Monthly Orders (Bar chart)</h3>
            </div>
            <ShoppingBag size={18} className="text-gold" />
          </div>
          <div className="mt-6 h-64 w-full">
            {monthlyOrders.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrders} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262624" />
                  <XAxis dataKey="month" stroke="#777" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#777" tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip prefix="" />} />
                  <Bar dataKey="count" fill="#8e7b54" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[#888]">
                No order history in this period
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Distributor-wise Sales - Bar Chart */}
        <section className="border border-white/10 bg-[#171714] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">DISTRIBUTION PARTNERS</div>
              <h3 className="serif mt-1 text-xl">Distributor-wise Sales (Bar chart)</h3>
            </div>
            <Users size={18} className="text-gold" />
          </div>
          <div className="mt-6 h-64 w-full">
            {distributorSales.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributorSales} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262624" />
                  <XAxis type="number" stroke="#777" tick={{ fontSize: 10 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <YAxis dataKey="name" type="category" stroke="#777" tick={{ fontSize: 9 }} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" fill="#c59b27" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[#888]">
                No distributor sales recorded
              </div>
            )}
          </div>
        </section>

        {/* Product Division Sales - Pie Chart */}
        <section className="border border-white/10 bg-[#171714] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">PORTFOLIO CONTRIBUTION</div>
              <h3 className="serif mt-1 text-xl">Product Division Sales (Pie chart)</h3>
            </div>
            <Package size={18} className="text-gold" />
          </div>
          <div className="mt-6 h-64 w-full">
            {productSales.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productSales}
                    dataKey="sales"
                    nameKey="division"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ division, percent }) => `${division} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {productSales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[#888]">
                No product division revenue recorded
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Order Status Distribution & Inventory Movement */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="border border-white/10 bg-[#171714] p-5">
          <div className="eyebrow">ORDER LIFECYCLE</div>
          <h3 className="serif mt-1 text-xl">Order Status Distribution</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["PLACED", "CONFIRMED", "PROCESSING", "PACKED", "DISPATCHED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"].map(
              (st) => {
                const count = orderStatusDistribution.find((x) => x.status === st)?.count || 0;
                return (
                  <div key={st} className="border border-white/10 bg-[#10100f] p-3 text-center">
                    <div className="text-[10px] tracking-wider text-[#888]">{st}</div>
                    <div className="serif mt-1 text-xl font-bold text-white">{count}</div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        <section className="border border-white/10 bg-[#171714] p-5">
          <div className="eyebrow">INVENTORY OPERATIONS</div>
          <h3 className="serif mt-1 text-xl">Stock Movement Activity</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {(data?.stockMovementSummary || [
              { type: "IN", count: 0, totalQty: 0 },
              { type: "OUT", count: 0, totalQty: 0 },
              { type: "ADJUSTMENT", count: 0, totalQty: 0 }
            ]).map((sm) => (
              <div key={sm.type} className="border border-white/10 bg-[#10100f] p-4 text-center">
                <div className="text-[10px] font-bold text-gold">TYPE {sm.type}</div>
                <div className="serif mt-2 text-2xl font-bold">{sm.totalQty}</div>
                <div className="text-[10px] text-[#888]">{sm.count} transactions</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Orders DataTable */}
      <section className="mt-8">
        <h3 className="serif mb-4 text-2xl">Recent Platform Orders</h3>
        <DataTable
          columns={[
            { key: "id", label: "Order ID" },
            { key: "customer", label: "Distributor" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "date", label: "Date" }
          ]}
          rows={rows}
        />
      </section>

      {/* Top Products */}
      <section className="mt-8 border border-white/10 bg-[#171714] p-5">
        <h3 className="serif text-2xl">Top Products by Gross Sales</h3>
        <div className="mt-4 space-y-3">
          {(data?.topProducts || []).map((p) => (
            <div key={p.sku} className="flex justify-between border-b border-white/10 py-2 text-sm">
              <span>
                {p.name} <span className="text-[#999]">({p.quantity} units sold)</span>
              </span>
              <span className="font-semibold text-gold">{money(p.grossSales)}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
