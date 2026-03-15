export const JOB_STATUSES = [
  "applied",
  "interviewing",
  "offer",
  "rejected",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "internship",
] as const;

export type JobType = (typeof JOB_TYPES)[number];
export interface Job {
  company: string;
  title: string;
  createdAt: Date;
  _id: string;
  status: JobStatus;
  employmentType: JobType;
  location?: string;
}
