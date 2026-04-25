const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
        email,
        password,
    });

    const token = generateToken(user._id);

    return res.status(201).json(
        new ApiResponse(201, {
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        }, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id);

    return res.status(200).json(
        new ApiResponse(200, {
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        }, "User logged in successfully")
    );
});

module.exports = {
    registerUser,
    loginUser
};
