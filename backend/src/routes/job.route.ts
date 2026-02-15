import { Router } from "express";
import { createJob } from "../controllers/post.controller";

const jobRouter = Router();

jobRouter.route("/create").post(createJob);

export default jobRouter;
