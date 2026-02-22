import Book from "../models/bookModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ... (existing createBook and getBooks)
// I will just replace the whole file for clarity since I'm adding imports and new functions

export const createBook = async (req, res) => {
    try {
        const { title, author, price, rating, category, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
        const fileName = req.file.filename;
        if (!title || !author || !price || !category || !description) {
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }
        const book = await Book.create({
            title, author, price: Number(price), image: fileName,
            rating: rating ? Number(rating) : 4, category, description
        });
        res.status(201).json({ success: true, message: "Book added successfully", book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });
        res.status(200).json({ success: true, book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateBook = async (req, res) => {
    try {
        const { title, author, price, rating, category, description } = req.body;
        let updateData = { title, author, price: Number(price), rating: Number(rating), category, description };

        if (req.file) {
            updateData.image = req.file.filename;
            // Optionally delete old image here
        }

        const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });

        res.status(200).json({ success: true, message: "Book updated successfully", book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        if (book.image) {
            const imagePath = path.join(__dirname, '../uploads', book.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
