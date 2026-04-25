// Example validation middleware. You can also integrate Joi/Zod here.

const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  next();
};

module.exports = {
  validateCreateUser,
};
