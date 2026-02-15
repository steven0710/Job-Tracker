import mongoose, { Schema } from "mongoose";

export interface JobDocument extends mongoose.Document {
  title: string;
  company: string;
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  status: "applied" | "interviewing" | "offer" | "rejected";
  userId: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true, trim: true, maxLength: 100 },
    company: { type: String, required: true, trim: true, maxLength: 100 },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    status: {
      type: String,
      enum: ["applied", "interviewing", "offer", "rejected"],
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
