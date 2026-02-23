// ===== Imports =====
import mongoose from 'mongoose';


// ===== DB Connection =====
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri || uri === "your_mongodb_uri") {
            throw new Error("MONGO_URI is missing or contains the placeholder 'your_mongodb_uri' in .env");
        }
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};