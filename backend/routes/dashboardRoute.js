import express from "express";
import { getAdminStats, getLatestOrders } from "../controllers/dashboardController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", authMiddleware, adminMiddleware, getAdminStats);
dashboardRouter.get("/latest-orders", authMiddleware, adminMiddleware, getLatestOrders);

export default dashboardRouter;
