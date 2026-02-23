import Book from "../models/bookModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Create Book =====
export const createBook = async (req, res) => {
    try {
        const { title, author, price, rating, category, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        if (!title || !author || !price || !category || !description) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

        // Upload to Cloudinary
        // NOTE: If this fails after ~3 seconds, check your CLOUDINARY_NAME in .env
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "books",
        });

        // Delete local file after upload
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

        const book = await Book.create({
            title,
            author,
            price: Number(price),
            image: result.secure_url,
            rating: rating ? Number(rating) : 4,
            category,
            description
        });

        res.status(201).json({ success: true, message: "Book added successfully", book });
    } catch (error) {
        console.error("Create Book Error:", error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            tip: "Check your Cloudinary credentials in .env if this is a timeout."
        });
    }
};

// ===== Get All Books =====
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, books });
    } catch (error) {
        console.error("Get Books Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ===== Get Single Book =====
export const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });
        res.status(200).json({ success: true, book });
    } catch (error) {
        console.error("Get Single Book Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ===== Update Book =====
export const updateBook = async (req, res) => {
    try {
        const { title, author, price, rating, category, description } = req.body;
        let updateData = { title, author, price: Number(price), rating: Number(rating), category, description };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "books",
            });
            updateData.image = result.secure_url;
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        }

        const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });

        res.status(200).json({ success: true, message: "Book updated successfully", book });
    } catch (error) {
        console.error("Update Book Error:", error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// ===== Delete Book =====
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        if (book.image) {
            if (book.image.startsWith("http")) {
                const parts = book.image.split('/');
                const fileNameWithExtension = parts[parts.length - 1];
                const fileName = fileNameWithExtension.split('.')[0];
                const folder = parts[parts.length - 2];
                const publicId = folder !== 'upload' ? `${folder}/${fileName}` : fileName;
                await cloudinary.uploader.destroy(publicId);
            } else {
                const imagePath = path.join(__dirname, '../uploads', book.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        console.error("Delete Book Error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};
