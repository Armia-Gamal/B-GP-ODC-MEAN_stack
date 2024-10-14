const jwt = require('jsonwebtoken');

// Admin authorization middleware
const adminMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Assuming you send the token in a cookie or as a Bearer token

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. You do not have admin rights." });
        }
        req.user = decoded; // Store user info in request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = adminMiddleware;
