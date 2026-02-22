import mongoose, { Schema } from "mongoose";
import {
  EMPLOYMENT_TYPES,
  EmploymentType,
  JOB_STATUSES,
  JobStatus,
} from "../constants/job.constants";

export interface JobDocument extends mongoose.Document {
  title: string;
  company: string;
  employmentType?: EmploymentType;
  status: JobStatus;
  userId: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true, trim: true, maxLength: 100 },
    company: { type: String, required: true, trim: true, maxLength: 100 },
    employmentType: {
      type: String,
      enum: EMPLOYMENT_TYPES,
    },
    status: {
      type: String,
      enum: JOB_STATUSES,
      default: "applied",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // always tie a job to a user
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
