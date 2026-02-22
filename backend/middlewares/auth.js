// ===== Imports =====
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



// ===== Auth Middleware =====
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Verify token
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        // Attach user from DB
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        let message = "Unauthorized";
        if (error.name === "TokenExpiredError") message = "Token Expired";
        if (error.name === "JsonWebTokenError") message = "Invalid Token";

        return res.status(401).json({
            success: false,
            message: message,
            error: error.message
        });
    }
};

// ===== Admin Middleware =====
export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access Denied: Admin only",
        });
    }
};
