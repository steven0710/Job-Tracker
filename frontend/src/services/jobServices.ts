import { BACKEND_API } from "../constants";
import type { Job } from "../types/jobs";

// const STORAGE_KEY = "jobs";

// export async function getJobs(): Promise<Job[]> {
//   const saved = localStorage.getItem(STORAGE_KEY);
//   return saved ? JSON.parse(saved) : [];
// }

// export async function addJob(job: Job): Promise<Job[]> {
//   const jobs = await getJobs();
//   const updated = [...jobs, job];
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//   return updated;
// }

export async function getJobsByApi(): Promise<{ jobs: Job[] }> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_API}/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("getJobsByApi response status:", res.status);
  console.log("getJobsByApi response json:", data);
  return data;
}

export async function createJob(
  job: Omit<Job, "createdAt" | "_id">,
): Promise<Job> {
  const token = localStorage.getItem("token");
  console.log("Token in localStorage before createJob:", token);
  const res = await fetch(`${BACKEND_API}/jobs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  });

  const data = await res.json();
  console.log("createJob response status:", res.status);
  console.log("createJob response json:", data);

  if (!res.ok) {
    throw new Error(data?.message || `Create job failed: ${res.status}`);
  }

  return data; // if API returns { job: ... }, use: return data.job;
}

export async function deleteJobReal(id: string): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_API}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.message || `Delete job failed: ${res.status}`);
  }
}

export async function updateJob(
  id: string,
  updatedFields: Partial<Omit<Job, "createdAt" | "_id">>,
): Promise<Job> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_API}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Update job failed: ${res.status}`);
  }
  return data;
}
