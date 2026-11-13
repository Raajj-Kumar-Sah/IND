import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, FileText, Search, User, Briefcase, MapPin, Phone, Mail } from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import { recruitmentApi } from "../../services/recruitment.js";

export default function ApplicationsManager() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [viewCandidate, setViewCandidate] = useState(null);
  const [form, setForm] = useState({
    startsAt: "",
    durationMinutes: 30,
    mode: "GOOGLE_MEET",
    meetingUrl: "",
    location: "",
    interviewerName: "",
    notes: ""
  });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  async function load() {
    try {
      const params = {};
      if (filter !== "All") params.stage = filter;
      if (search.trim()) params.search = search.trim();
      const r = await recruitmentApi.listApplications(params);
      setRows(r.data || []);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, [filter, search]);

  async function update(id, stage) {
    try {
      await recruitmentApi.updateApplicationStage(id, stage);
      setRows((prev) => prev.map((x) => (x.id === id ? { ...x, stage } : x)));
      setNotice(`Candidate stage updated to ${stage}. Automatic Brevo notification sent.`);
    } catch (e) {
      setError(e.message);
    }
  }

  async function schedule(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = { ...form, startsAt: new Date(form.startsAt).toISOString() };
      const r = await recruitmentApi.scheduleInterview(selected.id, payload);
      setNotice(r.message || "Interview scheduled and candidate notified via Brevo.");
      setSelected(null);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const columns = [
    { key: "id", label: "Application" },
    {
      key: "name",
      label: "Candidate",
      render: (_, r) => (
        <button
          onClick={() => setViewCandidate(r)}
          className="text-left font-semibold text-white underline hover:text-gold"
        >
          {r.name}
        </button>
      )
    },
    { key: "email", label: "Email" },
    { key: "role", label: "Position" },
    { key: "received", label: "Received" },
    {
      key: "resume",
      label: "Resume",
      render: (_, r) => (
        <a
          href={r.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-gold hover:underline"
        >
          <FileText size={13} /> View Resume
        </a>
      )
    },
    {
      key: "stage",
      label: "Stage",
      render: (v, r) => (
        <select
          value={v}
          onChange={(e) => update(r.id, e.target.value)}
          className="field min-w-32 py-1.5 text-xs"
        >
          {["New", "Shortlisted", "Interview", "Selected", "Rejected", "On Hold"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      )
    },
    {
      key: "schedule",
      label: "Interview",
      render: (_, r) => (
        <button
          onClick={() => {
            setSelected(r);
            setForm({
              startsAt: "",
              durationMinutes: 30,
              mode: "GOOGLE_MEET",
              meetingUrl: "",
              location: "",
              interviewerName: "",
              notes: ""
            });
          }}
          className="inline-flex items-center gap-1 border border-gold/40 px-3 py-1.5 text-[10px] text-gold hover:bg-gold hover:text-ink"
        >
          <CalendarDays size={13} /> Schedule
        </button>
      )
    }
  ];

  return (
    <>
      <SectionHeading
        eyebrow="TALENT RECRUITMENT PIPELINE"
        title="Candidate Applications"
        description="Search candidates by title, skills and experience, review resumes, progress stages and schedule automated interviews."
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2 border border-white/15 bg-[#171714] px-3 py-2 max-w-md">
          <Search size={15} className="text-[#8e887d]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white outline-none"
            placeholder="Search candidates by name, email, job title, skills..."
          />
        </div>
        <div className="text-xs text-[#999]">{rows.length} candidates found</div>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      {notice && <p className="mt-3 text-sm text-emerald-300">{notice}</p>}

      <div className="my-6 flex flex-wrap gap-2">
        {["All", "New", "Shortlisted", "Interview", "Selected", "Rejected", "On Hold"].map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            className={`border px-4 py-2 text-[10px] uppercase tracking-wider ${
              filter === x ? "border-gold bg-[#2b261c] text-gold" : "border-white/10 text-[#aaa59b]"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <DataTable columns={columns} rows={rows} />

      {/* Candidate Profile Modal */}
      {viewCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
          <div className="my-8 w-full max-w-2xl border border-white/20 bg-[#171714] p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="eyebrow">CANDIDATE DOSSIER</div>
                <h2 className="serif mt-1 text-2xl">{viewCandidate.name}</h2>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#999]">
                  <span className="flex items-center gap-1"><Briefcase size={12} /> {viewCandidate.role}</span>
                  <span className="flex items-center gap-1"><Mail size={12} /> {viewCandidate.email}</span>
                  <span className="flex items-center gap-1"><Phone size={12} /> {viewCandidate.phone}</span>
                  {viewCandidate.location && <span className="flex items-center gap-1"><MapPin size={12} /> {viewCandidate.location}</span>}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewCandidate(null)}
                className="text-lg text-[#888] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Cover Note & Experience Summary</div>
                <div className="mt-1.5 whitespace-pre-line border border-white/10 bg-[#111] p-3 text-[#ccc]">
                  {viewCandidate.coverNote || "No cover note provided by candidate."}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Resume Document</div>
                <a
                  href={viewCandidate.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center gap-2 border border-gold/40 px-3 py-2 text-gold hover:bg-gold hover:text-ink"
                >
                  <FileText size={14} /> Open Resume in New Tab <ExternalLink size={12} />
                </a>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">Application Stage History</div>
                <div className="mt-2 space-y-2 border-l border-white/20 pl-3">
                  {(viewCandidate.history || []).map((h, i) => (
                    <div key={i} className="text-xs">
                      <span className="font-semibold text-white">{h.stage}</span> —{" "}
                      <span className="text-[#888]">{new Date(h.at).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewCandidate(null)}
                className="gold-button text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
          <form
            onSubmit={schedule}
            className="my-8 w-full max-w-xl border border-[#655333] bg-[#171714] p-6 shadow-2xl"
          >
            <div className="flex justify-between">
              <div>
                <div className="eyebrow">INTERVIEW SCHEDULING</div>
                <h2 className="serif mt-2 text-2xl">{selected.name}</h2>
                <p className="text-xs text-[#999]">
                  {selected.email} · {selected.role}
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-[#aaa]">
                Date & time (local)
                <input
                  required
                  type="datetime-local"
                  className="field mt-2 w-full"
                  value={form.startsAt}
                  onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                />
              </label>

              <label className="text-xs text-[#aaa]">
                Duration
                <select
                  className="field mt-2 w-full"
                  value={form.durationMinutes}
                  onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                >
                  {[15, 30, 45, 60, 90, 120].map((n) => (
                    <option value={n} key={n}>
                      {n} minutes
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs text-[#aaa]">
                Meeting mode
                <select
                  className="field mt-2 w-full"
                  value={form.mode}
                  onChange={(e) => setForm({ ...form, mode: e.target.value })}
                >
                  <option value="GOOGLE_MEET">Google Meet</option>
                  <option value="ZOOM">Zoom</option>
                  <option value="IN_PERSON">In person</option>
                </select>
              </label>

              <label className="text-xs text-[#aaa]">
                Interviewer name
                <input
                  required
                  className="field mt-2 w-full"
                  value={form.interviewerName}
                  onChange={(e) => setForm({ ...form, interviewerName: e.target.value })}
                />
              </label>

              {form.mode === "IN_PERSON" ? (
                <label className="text-xs text-[#aaa] sm:col-span-2">
                  Venue Address
                  <input
                    required
                    className="field mt-2 w-full"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </label>
              ) : (
                <label className="text-xs text-[#aaa] sm:col-span-2">
                  Meeting URL (Leave blank to generate automatically)
                  <input
                    type="url"
                    className="field mt-2 w-full"
                    placeholder="https://... (auto-generated if empty)"
                    value={form.meetingUrl}
                    onChange={(e) => setForm({ ...form, meetingUrl: e.target.value })}
                  />
                </label>
              )}

              <label className="text-xs text-[#aaa] sm:col-span-2">
                Candidate Instructions & Agenda
                <textarea
                  rows="3"
                  className="field mt-2 w-full"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </label>
            </div>

            <p className="mt-3 text-[10px] text-[#888]">
              Interview confirmation, calendar invite and joining instructions will be automatically dispatched via Brevo API.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="border border-white/20 px-4 py-2 text-xs"
              >
                Cancel
              </button>
              <button disabled={busy} className="gold-button">
                {busy ? "Scheduling..." : "Schedule & Notify Candidate"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
