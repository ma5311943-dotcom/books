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
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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




// ===== Database =====
connectDB();

// ===== Server =====
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});