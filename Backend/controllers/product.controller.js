import { redis } from '../libs/redis.js';
import Product from '../models/product.model.js';
import cloudinary from './../libs/cloudinary.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products });
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
            return res
                .status(404)
                .json({ message: 'No featured products found' });
        }

        await redis.set('featured_products', JSON.stringify(featuredProducts)); // Cache for 1 hour
        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching featured products',
            error
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            isFeatured
        });
        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: 'products'
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url
                ? cloudinaryResponse.secure_url
                : '',
            category
        });

        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.image) {
            const publicId = product.image.split('/').pop().split('.')[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log('Image deleted from Cloudinary');
            } catch (error) {
                console.error('Error deleting image from Cloudinary:', error);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 10 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ]);

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching recommended products',
            error
        });
    }
};

export const getProductsByCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const products = await Product
            .find({ category: category });

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products by category',
            error
        });
    }
};

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.json({ message: 'Product featured status updated', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set(
            'featured_products',
            JSON.stringify(featuredProducts)
        );
    } catch (error) {
        console.error('Error updating featured products cache:', error);
    }
}