const jwt = require('jsonwebtoken');

const usersMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Please log in to access this resource.' });
        }

        jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token.' });
            }
            req.user = decoded; // Optionally attach user info to request
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = usersMiddleware;
