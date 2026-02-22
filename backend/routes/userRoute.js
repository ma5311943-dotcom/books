import express from "express";
import { loginUser, registerUser, updateProfile, getAllUsers, deleteUser } from "../controllers/userController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/profile", authMiddleware, updateProfile);

// Admin routes
userRouter.get("/list", authMiddleware, adminMiddleware, getAllUsers);
userRouter.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default userRouter;
