import { Request, Response } from "express";
import { Job } from "../models/jobs.model";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, company, status } = req.body;
    const userId = (req as any).user.userId; // from authMiddleware

    const job = await Job.create({ title, company, status, userId });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
