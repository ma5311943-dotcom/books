// ===== Imports =====
import express from "express";
import { addToCart, removeCartItem, updateCartItem, getCart, clearUserCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/auth.js";

const cartRouter = express.Router();

// ===== Routes =====
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeCartItem);
cartRouter.post("/update", authMiddleware, updateCartItem);
cartRouter.post("/clear", authMiddleware, clearUserCart);
cartRouter.get("/:userId", authMiddleware, getCart);

export default cartRouter;