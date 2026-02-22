import express from "express";
import { placeOrder, getUserOrders, updateOrderStatus, listAllOrders, verifyOrder, rateOrder } from "../controllers/orderController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/place", (req, res) => res.status(405).json({ success: false, message: "Use POST method for order placement." }));
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.get("/user/:userId", authMiddleware, getUserOrders);
orderRouter.post("/status", authMiddleware, adminMiddleware, updateOrderStatus);
orderRouter.get("/list", authMiddleware, adminMiddleware, listAllOrders);
orderRouter.post("/rate", authMiddleware, rateOrder);

export default orderRouter;
