import { useEffect, useState, useRef } from "react";
import {
  FileText,
  UploadCloud,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import { adminDocumentApi, publicDocumentApi } from "../../services/documents.js";

export default function DocumentsManager() {
  const [data, setData] = useState({ documents: [], inquiries: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [uploadingKey, setUploadingKey] = useState("");
  const [dragOverKey, setDragOverKey] = useState("");
  const fileInputsRef = useRef({});

  async function load() {
    setLoading(true);
    try {
      const res = await adminDocumentApi.list();
      setData(res.data || { documents: [], inquiries: [] });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleFileUpload(key, file) {
    if (!file) return;
    setUploadingKey(key);
    setError("");
    setNotice("");
    try {
      const res = await adminDocumentApi.upload(key, file);
      setNotice(res.message || "File uploaded to Cloudinary successfully.");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setUploadingKey("");
    }
  }

  async function handleReset(key) {
    if (!confirm(`Reset ${key} back to default generated document?`)) return;
    setError("");
    setNotice("");
    try {
      const res = await adminDocumentApi.reset(key);
      setNotice(res.message || "Reset to system default.");
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  const inquiryRows = (data.inquiries || []).map((inq) => ({
    id: inq._id?.slice(-6)?.toUpperCase() || "INQ",
    company: inq.companyName,
    applicant: inq.applicantName,
    contact: `${inq.phone} · ${inq.email}`,
    location: `${inq.city}, ${inq.state}`,
    investment: inq.investmentCapacity || "—",
    storage: inq.storageSpace ? `${inq.storageSpace} sq ft` : "—",
    date: new Date(inq.createdAt).toLocaleDateString("en-IN")
  }));

  return (
    <>
      <SectionHeading
        eyebrow="ENTERPRISE DOCUMENT MANAGEMENT"
        title="Dynamic Catalogue & Partnership Assets"
        description="Manage the live IINDLUBE product catalogue, distributor application forms, and dealership agreement documents with Cloudinary storage and drag-and-drop replacement."
      />

      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
      {notice && <p className="mt-4 text-sm text-emerald-300">{notice}</p>}
      {loading && <p className="mt-4 text-xs text-[#aaa]">Loading enterprise assets…</p>}

      {/* Dynamic Documents Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(data.documents || []).map((doc) => {
          const isDragging = dragOverKey === doc.key;
          const isBusy = uploadingKey === doc.key;
          const downloadUrl = publicDocumentApi.getDownloadUrl(doc.key);

          return (
            <div
              key={doc.key}
              className={`flex flex-col justify-between border bg-[#171714] p-6 transition ${
                isDragging ? "border-gold bg-[#232018]" : "border-white/10"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverKey(doc.key);
              }}
              onDragLeave={() => setDragOverKey("")}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverKey("");
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileUpload(doc.key, file);
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{doc.division} / {doc.category}</span>
                  {doc.isCustom ? (
                    <span className="rounded bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      CLOUDINARY / CUSTOM
                    </span>
                  ) : (
                    <span className="rounded bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      DEFAULT AUTO-GEN
                    </span>
                  )}
                </div>

                <h3 className="serif mt-3 text-xl font-bold">{doc.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#99948a]">{doc.description}</p>

                <div className="mt-4 border-t border-white/10 pt-3 text-[11px] text-[#888]">
                  <div>Current File: <span className="text-white">{doc.fileName || `${doc.key}.pdf`}</span></div>
                  {doc.fileSize > 0 && (
                    <div>Size: <span className="text-[#aaa]">{(doc.fileSize / (1024 * 1024)).toFixed(2)} MB</span></div>
                  )}
                  <div>Version: <span className="text-gold">v{doc.version || 1}</span></div>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onClick={() => fileInputsRef.current[doc.key]?.click()}
                  className="mt-4 cursor-pointer rounded border-2 border-dashed border-white/20 bg-[#121210] p-4 text-center transition hover:border-gold hover:bg-[#1a1813]"
                >
                  <UploadCloud size={24} className="mx-auto text-gold" />
                  <div className="mt-2 text-xs font-semibold text-white">
                    {isBusy ? "Uploading to Cloudinary..." : "Drag & drop new file here"}
                  </div>
                  <div className="text-[10px] text-[#777]">or click to select PDF / Word document</div>
                  <input
                    type="file"
                    ref={(el) => (fileInputsRef.current[doc.key] = el)}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(doc.key, file);
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-button inline-flex items-center gap-1.5 py-2 text-xs"
                >
                  <Download size={13} /> Test Download
                </a>

                {doc.isCustom && (
                  <button
                    onClick={() => handleReset(doc.key)}
                    className="flex items-center gap-1 text-[11px] text-red-300 hover:underline"
                  >
                    <RefreshCw size={11} /> Reset
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Incoming Partnership Inquiries Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="eyebrow">DISTRIBUTION INQUIRIES</div>
            <h3 className="serif mt-1 text-2xl font-bold">Partner with IINDLUBE Applications</h3>
            <p className="mt-1 text-xs text-[#999]">
              Inquiries submitted through the public Partner with Us portal by prospective lubricants distributors and stockists.
            </p>
          </div>
          <span className="text-xs text-gold">{inquiryRows.length} total inquiries</span>
        </div>

        <div className="mt-6">
          <DataTable
            columns={[
              { key: "id", label: "Ref" },
              { key: "company", label: "Company" },
              { key: "applicant", label: "Applicant" },
              { key: "contact", label: "Contact Details" },
              { key: "location", label: "Territory / Location" },
              { key: "investment", label: "Proposed Capital" },
              { key: "storage", label: "Warehousing" },
              { key: "date", label: "Received Date" }
            ]}
            rows={inquiryRows}
          />
        </div>
      </section>
    </>
  );
}
