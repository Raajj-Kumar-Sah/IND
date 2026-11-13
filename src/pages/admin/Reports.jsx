import { useState } from "react";
import { Download, FileSpreadsheet, Filter } from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import { analyticsApi } from "../../services/analytics.js";

const reports = [
  ["orders", "Orders & Sales Report", "Detailed breakdown of orders, SKUs, distributor accounts, billing subtotals and fulfillment states."],
  ["payments", "Payments & Collections Report", "Gateway transactions, Razorpay references, captured payments and audit reconciliation."],
  ["inventory", "Inventory & Stock Balance Report", "SKUs, product categories, divisions, current stock balances and reorder alerts."],
  ["distributors", "Distributor Accounts & Credit Report", "Registered distributor profiles, credit limits, payment terms and approval statuses."],
  ["stock-movements", "Stock Movement Audit Trail", "Historical inward, outward and manual inventory adjustment logs."]
];

export default function Reports() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distributor, setDistributor] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function download(kind, format = "xlsx") {
    setBusy(`${kind}-${format}`);
    setError("");
    setDone("");
    try {
      const params = {
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
        ...(distributor ? { distributor } : {}),
        ...(status ? { status } : {})
      };
      await analyticsApi.export(kind, params, format);
      setDone(`${kind.toUpperCase()} report generated and downloaded as ${format.toUpperCase()}.`);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <>
      <SectionHeading
        eyebrow="BUSINESS INTELLIGENCE & EXCEL EXPORTS"
        title="Enterprise Reports"
        description="Generate formatted Microsoft Excel (.xlsx) workbooks and CSV exports with multi-parameter filtering."
      />

      {/* Filter Toolbar */}
      <section className="mt-6 border border-white/10 bg-[#171714] p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-gold">
          <Filter size={14} /> FILTER REPORT PARAMETERS
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs text-[#aaa]">
            From Date
            <input
              type="date"
              className="dark-field mt-2 block w-full"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label className="text-xs text-[#aaa]">
            To Date
            <input
              type="date"
              className="dark-field mt-2 block w-full"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <label className="text-xs text-[#aaa]">
            Distributor Filter
            <input
              type="text"
              placeholder="Company or contact name"
              className="dark-field mt-2 block w-full"
              value={distributor}
              onChange={(e) => setDistributor(e.target.value)}
            />
          </label>
          <label className="text-xs text-[#aaa]">
            Status Filter
            <select
              className="dark-field mt-2 block w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="PLACED">Placed</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PROCESSING">Processing</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="low">Low Stock (Inventory)</option>
              <option value="out">Out of Stock (Inventory)</option>
            </select>
          </label>
        </div>
      </section>

      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
      {done && <p className="mt-4 text-sm text-emerald-300">{done}</p>}

      {/* Reports Grid */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {reports.map(([kind, title, description]) => (
          <div key={kind} className="flex flex-col justify-between border border-white/10 bg-[#171714] p-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow">EXCELJS WORKBOOK</span>
                <FileSpreadsheet size={16} className="text-gold" />
              </div>
              <h3 className="serif mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#99948a]">{description}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <button
                disabled={!!busy}
                onClick={() => download(kind, "xlsx")}
                className="gold-button flex-1 justify-center text-xs"
              >
                <Download size={14} />
                {busy === `${kind}-xlsx` ? "Exporting..." : "Excel (.xlsx)"}
              </button>
              <button
                disabled={!!busy}
                onClick={() => download(kind, "csv")}
                className="border border-white/20 px-4 py-2.5 text-xs text-white hover:bg-white/10 disabled:opacity-30"
              >
                {busy === `${kind}-csv` ? "..." : "CSV"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-[#888]">
        All exports generate production-grade styled Excel workbooks using ExcelJS with auto-formatted column widths, header themes, and currency formatting.
      </p>
    </>
  );
}
