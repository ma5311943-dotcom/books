// ===== Imports =====
import mongoose from 'mongoose';


// ===== DB Connection =====
export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://bookshell:bookshell@bookshell.rf63c1a.mongodb.net/?appName=bookshell'
        );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};