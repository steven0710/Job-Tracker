import mongoose, { Schema } from "mongoose";

export interface JobDocument extends mongoose.Document {
  title: string;
  company: string;
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  status: "open" | "closed";
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true, trim: true, maxLength: 100 },
    company: { type: String, required: true, trim: true, maxLength: 100 },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
