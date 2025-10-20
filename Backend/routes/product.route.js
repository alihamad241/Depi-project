import { getSalt } from 'bcryptjs';
import express from 'express';
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts } from '../controllers/product.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';
import { create } from 'zustand';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/featured', getFeaturedProducts);
router,get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;