import z from "zod";
import { EMPLOYMENT_TYPES, JOB_STATUSES } from "../constants/job.constants";

export const createJobSchema = z
  .object({
    title: z.string().trim().min(1),
    company: z.string().trim().min(1),
    employmentType: z.enum(EMPLOYMENT_TYPES),
    status: z.enum(JOB_STATUSES),
  })
  .strict();

export const updateJobSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    company: z.string().trim().min(1).optional(),
    employmentType: z.enum(EMPLOYMENT_TYPES).optional(),
    status: z.enum(JOB_STATUSES).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
