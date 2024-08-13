import express from "express";
import {
  getBarChartData,
  getPieChartData,
  statisticsData,
  transactions,
} from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.route("/pie").get(getPieChartData);

apiRouter.route("/bar").get(getBarChartData);

apiRouter.route("/statistics").get(statisticsData);

apiRouter.route("/transactions").get(transactions);

export { apiRouter };
