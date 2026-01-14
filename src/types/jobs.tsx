export type JobStatus = "Applied" | "Interview" | "Rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
}