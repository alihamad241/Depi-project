export const protectRoute = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }
    } catch (error) {
        
    }
};