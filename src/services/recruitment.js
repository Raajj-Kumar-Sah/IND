import { apiRequest } from "./api.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Upload a resume file to Cloudinary via the server proxy.
 * Returns { url, publicId, fileName, fileSize, format }
 * @param {File} file - The resume file (PDF/DOC/DOCX)
 * @param {function} onProgress - Optional progress callback (0–100)
 */
export async function uploadResume(file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("resume", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}/upload/resume`);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      };
    }

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (!xhr.ok || !json.success) {
          reject(new Error(json.message || "Upload failed"));
        } else {
          resolve(json.data);
        }
      } catch {
        reject(new Error("Invalid server response"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.ontimeout = () => reject(new Error("Upload timed out"));
    xhr.timeout = 60000; // 60 s
    xhr.send(formData);
  });
}

export const recruitmentApi = {
  listPublicJobs: () => apiRequest("/jobs?status=OPEN"),
  listHrJobs: () => apiRequest("/hr/jobs"),
  createJob: payload => apiRequest("/hr/jobs", { method: "POST", body: JSON.stringify(payload) }),
  updateJob: (id, payload) => apiRequest(`/hr/jobs/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  listApplications: (params = {}) => apiRequest(`/hr/applications?${new URLSearchParams(params)}`),
  updateApplicationStage: (id, stage) => apiRequest(`/hr/applications/${id}/stage`, { method: "PATCH", body: JSON.stringify({ stage }) }),
  /**
   * Submit a job application.
   * resumeUrl must already be a Cloudinary URL obtained via uploadResume().
   */
  submitApplication: payload => apiRequest("/applications", { method: "POST", body: JSON.stringify(payload) }),
  listInterviews: () => apiRequest("/hr/interviews"),
  scheduleInterview: (applicationId, payload) => apiRequest(`/hr/interviews/applications/${applicationId}`, { method: "POST", body: JSON.stringify(payload) }),
  updateInterviewStatus: (id, status) => apiRequest(`/hr/interviews/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })
};
