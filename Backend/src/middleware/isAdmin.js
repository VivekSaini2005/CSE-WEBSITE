const ApiError = require('../utils/ApiError');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        throw new ApiError(403, 'Forbidden: Admins only');
    }
    next();
};

module.exports = isAdmin;