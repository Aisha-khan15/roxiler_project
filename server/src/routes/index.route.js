import express from "express";
import { apiRouter } from "./api.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1", apiRouter);

export { indexRouter };
