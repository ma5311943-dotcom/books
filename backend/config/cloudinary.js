import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudName = process.env.CLOUDINARY_NAME;
if (!cloudName || cloudName === "your_cloudinary_cloud_name") {
    console.error("CRITICAL: CLOUDINARY_NAME is missing or using placeholder in .env!");
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
