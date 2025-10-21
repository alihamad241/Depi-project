import Product from '../models/product.model.js';

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(
            (item) => item.id === productId
        );
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push(productId);
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter(
                (item) => item.id !== productId
            );
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find(
            (item) => item.id === productId
        );
        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(
                    (item) => item.id !== productId
                );
                await user.save();
                return res.json(user.cartItems);
            }

            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating quantity', error });
    }
};

export const getCartProducts = async (req, res) => {
    try {
        const productIds = req.user.cartItems.map((item) => item._id);
        const products = await Product.find({ _id: { $in: productIds } });

        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find(
                (cartItem) => cartItem._id.toString() === product._id.toString()
            );
            return {
                ...product.toJSON(),
                quantity: item.quantity
            };
        });
        // console.log(cartItems);

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching cart products',
            error
        });
    }
};
