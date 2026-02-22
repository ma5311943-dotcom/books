// ===== Imports =====
import express from "express";
import { createBook, deleteBook, getBooks, getSingleBook, updateBook } from "../controllers/bookController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";
import multer from "multer";

const bookRouter = express.Router();

// ===== Multer Setup =====
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// ===== Routes =====
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getSingleBook);

// Admin Protected Routes
bookRouter.post("/", authMiddleware, adminMiddleware, upload.single("image"), createBook);
bookRouter.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateBook);
bookRouter.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

export default bookRouter;