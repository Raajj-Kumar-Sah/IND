import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, BriefcaseBusiness, MapPin, Search,
  Mail, Globe, Flame, X, ChevronRight,
  UploadCloud, FileText, CheckCircle2, Loader2
} from "lucide-react";
import { recruitmentApi, uploadResume } from "../../services/recruitment.js";

const CORP = {
  address: "905 Station Road, Ahmedabad, Gujarat – 382440",
  division: "Petrochemicals Division (Brand: IINDLUBE)",
  email: "iindlube@indiraindustries.co.in",
  hr: "hr@indiraindustries.co.in",
  website: "www.indiraindustries.co.in",
};

const demoJobs = [
  {
    id: "JOB-101",
    title: "Area Sales Manager",
    department: "Sales",
    location: "Lucknow, Uttar Pradesh",
    type: "Full-time",
    division: "IINDLUBE",
    summary: "Build distributor relationships and grow regional lubricant sales across your territory.",
  },
  {
    id: "JOB-102",
    title: "Quality Executive",
    department: "Quality",
    location: "Noida, Uttar Pradesh",
    type: "Full-time",
    division: "IINDPURE",
    summary: "Support quality processes, product checks, lab testing and ISO documentation.",
  },
  {
    id: "JOB-103",
    title: "Merchandising Coordinator",
    department: "Operations",
    location: "Delhi NCR",
    type: "Full-time",
    division: "IINDSTYL",
    summary: "Coordinate apparel merchandising, sampling and production timelines.",
  },
  {
    id: "JOB-104",
    title: "Chemical R&D Engineer",
    department: "Research",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    division: "IINDLUBE",
    summary: "Develop and validate new lubricant formulations for automotive and industrial applications.",
  },
];

const DEPARTMENTS = ["All", "Sales", "Quality", "Operations", "Research"];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [apiMode, setApiMode] = useState("loading");

  useEffect(() => {
    let live = true;
    recruitmentApi
      .listPublicJobs()
      .then((r) => {
        if (live && Array.isArray(r.data)) {
          setJobs(r.data);
          setApiMode("live");
        }
      })
      .catch(() => {
        if (live) {
          setJobs(demoJobs);
          setApiMode("demo");
        }
      });
    return () => { live = false; };
  }, []);

  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Resume upload state
  const [resumeFile, setResumeFile] = useState(null);       // File object
  const [resumeUrl, setResumeUrl] = useState("");            // Cloudinary URL after upload
  const [uploadProgress, setUploadProgress] = useState(0);  // 0–100
  const [uploadState, setUploadState] = useState("idle");   // idle | uploading | done | error
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const filtered = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (dept === "All" || j.department === dept) &&
          `${j.title} ${j.location} ${j.division}`.toLowerCase().includes(q.toLowerCase())
      ),
    [jobs, q, dept]
  );

  /* ── Reset resume state when modal closes / opens ── */
  function openJob(job) {
    setSelected(job);
    setSubmitted(false);
    setSubmitError("");
    setResumeFile(null);
    setResumeUrl("");
    setUploadProgress(0);
    setUploadState("idle");
    setUploadError("");
  }

  /* ── Handle resume file selection → auto-upload ── */
  async function handleResumeChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setUploadState("uploading");
    setUploadProgress(0);
    setUploadError("");
    setResumeUrl("");
    try {
      const result = await uploadResume(file, (pct) => setUploadProgress(pct));
      setResumeUrl(result.url);
      setUploadState("done");
    } catch (err) {
      setUploadState("error");
      setUploadError(err.message || "Upload failed. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0e0b]">

      {/* ── Hero ── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: 420 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&auto=format&fit=crop&q=70')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0f0e0b]" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <img
                src="/logo.jpg"
                alt="Indira Industries"
                className="h-12 w-12 rounded-full object-cover border-2 border-[#c9a84c]"
              />
            </div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#c9a84c] uppercase mb-3">
              Careers at Indira Industries
            </p>
            <h1 className="serif text-4xl md:text-6xl font-bold text-white leading-tight">
              Make your next move <span className="text-[#c9a84c]">matter.</span>
            </h1>
            <p className="mt-5 text-[#ccc] text-sm leading-7 max-w-xl">
              Join a team that values ownership, quality and meaningful progress.
              Explore current opportunities across our business divisions — IINDLUBE,
              IINDPURE, and IINDSTYL.
            </p>
            <div className="mt-6">
              <a
                href={`mailto:${CORP.hr}`}
                className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-black text-xs font-bold px-6 py-3 transition-colors"
              >
                <Mail size={14} /> Email HR: {CORP.hr}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate strip ── */}
      <div className="bg-[#171714] border-y border-white/10">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-6 text-[10px] text-[#aaa]">
          <span className="flex items-center gap-2"><MapPin size={12} className="text-[#c9a84c]" />{CORP.address}</span>
          <span className="flex items-center gap-2"><Flame size={12} className="text-[#c9a84c]" />{CORP.division}</span>
          <span className="flex items-center gap-2"><Mail size={12} className="text-[#c9a84c]" />{CORP.hr}</span>
          <span className="flex items-center gap-2"><Globe size={12} className="text-[#c9a84c]" />{CORP.website}</span>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

          {/* ── Left sidebar ── */}
          <aside>
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#c9a84c] uppercase">Grow With Us</p>
            <h2 className="serif mt-3 text-3xl text-white font-bold">Build a career with purpose.</h2>
            <p className="mt-4 text-sm leading-7 text-[#99948a]">
              We look for curious, accountable people who want to make a difference. Our opportunities span
              sales, operations, quality, technology and business support.
            </p>

            {/* How hiring works */}
            <div className="mt-8 border border-white/10 bg-[#171714] p-5">
              <BriefcaseBusiness className="text-[#c9a84c]" />
              <h3 className="serif mt-4 text-xl text-white">How hiring works</h3>
              <ol className="mt-4 grid gap-3 text-xs text-[#aaa59b]">
                <li className="flex items-start gap-2"><ChevronRight size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />Explore an open role</li>
                <li className="flex items-start gap-2"><ChevronRight size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />Submit your application</li>
                <li className="flex items-start gap-2"><ChevronRight size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />HR reviews your profile</li>
                <li className="flex items-start gap-2"><ChevronRight size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />Interview and selection</li>
              </ol>
            </div>

            {/* HR contact card */}
            <div className="mt-6 border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-5">
              <p className="text-[10px] font-bold tracking-widest text-[#c9a84c] uppercase">HR Contact</p>
              <a
                href={`mailto:${CORP.hr}`}
                className="mt-2 flex items-center gap-2 text-sm text-white hover:text-[#c9a84c] transition-colors"
              >
                <Mail size={15} className="text-[#c9a84c]" />{CORP.hr}
              </a>
              <p className="mt-3 text-[10px] text-[#aaa]">
                Send your resume directly to our HR team for consideration in upcoming roles.
              </p>
              <p className="mt-3 flex items-center gap-2 text-[10px] text-[#aaa]">
                <MapPin size={11} className="text-[#c9a84c] shrink-0" />{CORP.address}
              </p>
            </div>

            {/* Partner link */}
            <div className="mt-6 border border-white/10 bg-[#171714] p-5">
              <p className="text-xs text-[#aaa]">
                Interested in becoming a business partner instead?
              </p>
              <Link
                to="/partner-with-us"
                className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#c9a84c] hover:underline"
              >
                Partner with IINDLUBE <ChevronRight size={13} />
              </Link>
            </div>
          </aside>

          {/* ── Job listing ── */}
          <div>
            {/* Search & filter */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-1 items-center gap-2 border border-white/15 bg-[#171714] px-3">
                <Search size={15} className="text-[#8e887d]" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search roles, division or location…"
                  className="w-full bg-transparent py-3 text-xs outline-none text-white placeholder:text-[#666]"
                />
              </label>
              <select
                className="border border-white/15 bg-[#171714] text-xs text-white px-3 py-3 outline-none sm:w-44"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                {DEPARTMENTS.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            {/* Status bar */}
            <div className="mt-5 flex items-center justify-between text-[10px] tracking-widest text-[#8e887d]">
              <span>{filtered.length} OPEN POSITIONS</span>
              <span>
                {apiMode === "live"
                  ? "✦ LIVE HR FEED"
                  : apiMode === "demo"
                  ? "DEMO LISTINGS"
                  : "LOADING…"}
              </span>
            </div>

            {/* Job cards */}
            <div className="mt-4 grid gap-3">
              {filtered.map((job) => (
                <article
                  key={job.id}
                  className="border border-white/10 bg-[#171714] p-5 transition hover:border-[#c9a84c]/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#c9a84c]">
                      {job.division} · {job.department}
                    </span>
                    <span className="text-[10px] text-[#99948a]">{job.type}</span>
                  </div>
                  <h3 className="serif mt-3 text-2xl text-white font-bold">{job.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#99948a]">{job.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="flex items-center gap-2 text-[10px] text-[#aaa59b]">
                      <MapPin size={13} /> {job.location}
                    </span>
                    <button
                      onClick={() => { openJob(job); }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#c9a84c] hover:underline"
                    >
                      APPLY NOW <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center border border-white/10 bg-[#171714] mt-4">
                <p className="text-sm text-[#99948a]">No matching positions at the moment.</p>
                <a
                  href={`mailto:${CORP.hr}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-[#c9a84c] hover:underline"
                >
                  <Mail size={13} /> Send your CV directly to {CORP.hr}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Application modal ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto border border-[#c9a84c]/40 bg-[#171714] p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#c9a84c]">
                  APPLICATION / {selected.id}
                </div>
                <h2 className="serif mt-2 text-2xl text-white font-bold">{selected.title}</h2>
                <p className="mt-1 text-xs text-[#99948a]">
                  {selected.division} · {selected.location}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[#aaa59b] hover:text-white ml-4 mt-1"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="serif text-3xl text-[#c9a84c]">Thank you.</div>
                <p className="mt-3 text-sm text-[#aaa59b]">
                  Your application has been received. Our HR team will contact you soon.
                </p>
                <p className="mt-2 text-xs text-[#777]">
                  Questions? Email <a href={`mailto:${CORP.hr}`} className="text-[#c9a84c]">{CORP.hr}</a>
                </p>
                <button
                  className="mt-6 inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-black text-xs font-bold px-6 py-2.5"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                className="mt-7 grid gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!resumeUrl) {
                    setSubmitError("Please upload your resume before submitting.");
                    return;
                  }
                  const fd = new FormData(e.currentTarget);
                  const payload = {
                    jobId: selected.id,
                    consent: "true",
                    candidateName: fd.get("candidateName"),
                    email: fd.get("email"),
                    phone: fd.get("phone"),
                    location: fd.get("location") || "",
                    coverNote: fd.get("coverNote") || "",
                    resumeUrl
                  };
                  try {
                    await recruitmentApi.submitApplication(payload);
                    setSubmitted(true);
                  } catch (err) {
                    setSubmitError(
                      err.message || "Application service is unavailable. Please email your CV directly."
                    );
                  }
                }}
              >
                <input
                  required
                  name="candidateName"
                  className="w-full border border-white/15 bg-[#0f0e0b] px-4 py-3 text-xs text-white outline-none focus:border-[#c9a84c] placeholder:text-[#666]"
                  placeholder="Full name"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full border border-white/15 bg-[#0f0e0b] px-4 py-3 text-xs text-white outline-none focus:border-[#c9a84c] placeholder:text-[#666]"
                    placeholder="Email address"
                  />
                  <input
                    required
                    name="phone"
                    className="w-full border border-white/15 bg-[#0f0e0b] px-4 py-3 text-xs text-white outline-none focus:border-[#c9a84c] placeholder:text-[#666]"
                    placeholder="Phone number"
                  />
                </div>
                <input
                  name="location"
                  className="w-full border border-white/15 bg-[#0f0e0b] px-4 py-3 text-xs text-white outline-none focus:border-[#c9a84c] placeholder:text-[#666]"
                  placeholder="Current city / location"
                />

                {/* ── Resume Upload ── */}
                <div>
                  <p className="mb-2 text-[11px] font-semibold text-[#aaa]">
                    Resume / CV <span className="text-red-400">*</span>
                    <span className="ml-2 font-normal text-[#666]">(PDF, DOC, DOCX — max 10 MB)</span>
                  </p>

                  {uploadState === "idle" && (
                    <label
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-white/20 bg-[#0f0e0b] p-6 text-center transition hover:border-[#c9a84c]/60 hover:bg-[#c9a84c]/5"
                    >
                      <UploadCloud size={24} className="text-[#c9a84c]" />
                      <span className="text-xs text-[#aaa]">Click to select your resume file</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={handleResumeChange}
                      />
                    </label>
                  )}

                  {uploadState === "uploading" && (
                    <div className="border border-white/10 bg-[#0f0e0b] p-4">
                      <div className="flex items-center gap-3 text-xs text-[#aaa]">
                        <Loader2 size={14} className="animate-spin text-[#c9a84c]" />
                        <span>Uploading <strong className="text-white">{resumeFile?.name}</strong>…</span>
                        <span className="ml-auto text-[#c9a84c] font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#c9a84c] transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {uploadState === "done" && (
                    <div className="flex items-center justify-between border border-emerald-500/30 bg-emerald-950/20 p-3">
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                        <FileText size={13} className="shrink-0 text-[#aaa]" />
                        <span className="truncate text-white">{resumeFile?.name}</span>
                      </div>
                      <button
                        type="button"
                        className="ml-3 text-[10px] text-[#c9a84c] hover:underline shrink-0"
                        onClick={() => {
                          setResumeFile(null);
                          setResumeUrl("");
                          setUploadState("idle");
                          setUploadProgress(0);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      >
                        Change file
                      </button>
                    </div>
                  )}

                  {uploadState === "error" && (
                    <div className="border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-300">
                      <p>{uploadError}</p>
                      <button
                        type="button"
                        className="mt-2 text-[#c9a84c] hover:underline"
                        onClick={() => {
                          setUploadState("idle");
                          setUploadError("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      >
                        Try again
                      </button>
                    </div>
                  )}
                </div>

                <textarea
                  rows={4}
                  name="coverNote"
                  className="w-full border border-white/15 bg-[#0f0e0b] px-4 py-3 text-xs text-white outline-none focus:border-[#c9a84c] placeholder:text-[#666] resize-none"
                  placeholder="Short note to the hiring team (optional)"
                />
                <label className="flex items-start gap-2 text-[10px] leading-5 text-[#99948a]">
                  <input type="checkbox" required className="mt-1 accent-[#c9a84c]" />
                  I confirm the information is accurate and consent to its use for recruitment purposes.
                </label>
                <button
                  type="submit"
                  disabled={uploadState === "uploading" || !resumeUrl}
                  className="w-fit inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-black text-xs font-bold px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application <ArrowUpRight size={14} />
                </button>
                {submitError && (
                  <p role="alert" className="text-xs text-red-300">
                    {submitError}{" "}
                    <a href={`mailto:${CORP.hr}`} className="underline text-[#c9a84c]">
                      {CORP.hr}
                    </a>
                  </p>
                )}
                <p className="text-[10px] text-[#777269]">
                  Your resume is securely stored on Cloudinary. If the service is unavailable, email{" "}
                  <a href={`mailto:${CORP.hr}`} className="text-[#c9a84c]">{CORP.hr}</a> directly.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
