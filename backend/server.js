import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import bookRouter from './routes/bookRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

// ===== App Setup =====
const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic CORS based on .env
const frontendUrl = process.env.FRONTEND_URL;
let corsOrigin;
if (!frontendUrl || frontendUrl === '*') {
    corsOrigin = true;
} else {
    corsOrigin = frontendUrl.split(',').map(url => url.trim());
}
app.use(cors({
    origin: corsOrigin,
    credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Routes =====
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/dashboard', dashboardRouter);

// ===== Error Handling =====
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

// ===== Database =====
connectDB();

// ===== Server =====
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});