import express from "express";
import { indexRouter } from "./routes/index.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

export { app };
