import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import cartRoutes from './routes/cart.route.js';
import paymentRoutes from './routes/payment.route.js';
import { connectDB } from "./libs/db.js";
import couponRoutes from "./routes/coupon.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/analytics", analyticsRoutes);

import path from 'path';
import { fileURLToPath } from 'url';
// serve frontend
// if (process.env.NODE_ENV === 'production') {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(path.dirname(__filename));

    console.log('Serving frontend from ', path.join(__dirname, './frontend/dist'));
    app.use(express.static(path.join(__dirname, './frontend/dist')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend//dist/index.html'));
    });
// }

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

connectDB();

// export default app;
