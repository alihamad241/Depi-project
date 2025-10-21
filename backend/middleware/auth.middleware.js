import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        console.log("Access Token:", accessToken);

        if (!accessToken) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            
            if (!user) {
                return res.status(401).json({ message: 'User not found.' });
            }

            req.user = user;
            next(); 
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired.' });
            }
            throw error;
        }
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
};