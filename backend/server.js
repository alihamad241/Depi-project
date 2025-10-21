import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import cartRoutes from './routes/cart.route.js';
import paymentRoutes from './routes/payment.route.js';
import { connectDB } from './libs/db.js';
import couponRoutes from './routes/coupon.route.js';
import analyticsRoutes from './routes/analytics.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve frontend (SPA) build and add safe catch-all for client routes
const __filename = fileURLToPath(import.meta.url);
// project root (one level up from backend)
const __dirname = path.dirname(path.dirname(__filename));
const buildPath = path.join(__dirname, 'frontend', 'dist');

console.log('Serving frontend from ', buildPath);
app.use(express.static(buildPath));

app.use((req, res, next) => {
    // Only handle non-API GET requests with SPA index.html
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();

export default app;
