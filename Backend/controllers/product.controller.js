import { redis } from '../libs/redis.js';
import Product from '../models/product.model.js';
import cloudinary from './../libs/cloudinary.js';
import Product from './../models/product.model';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await redis.get('featured_products');
        if (featuredProducts) {
            return res.status(200).json(JSON.parse(featuredProducts));
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: 'No featured products found' });
        }

        await redis.set('featured_products', JSON.stringify(featuredProducts)); // Cache for 1 hour
        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured products', error });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const newProduct = new Product({ name, description, price, isFeatured });
        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'products' });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        });

        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};