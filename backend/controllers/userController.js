const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");

const removeFromCart = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	if (productId) {
		req.user.cart = req.user.cart.filter((ele) => {
			return ele != productId;
		});
		// while (user.cart.length > 0) {
		// 	user.cart.pop();
		// } //
		await req.user.save();
		res.status(201).json(req.user);
		// console.log("iteam removed");
	} else {
		res.status(400);
		throw new Error("Cannot remove from cart");
	}
});

// adding the data into cart
const addToCart = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const Product = await ProductModel.findById(productId);
	if (Product) {
		const user = req.user;
		// while (user.cart.length > 0) {
		// 	user.cart.pop();
		// }
		user.cart.push(Product._id.toString());
		await user.save();
		req.user = user;
		res.status(201).json(req.user);
		// console.log("iteam added to cart");
	} else {
		res.status(400);
		throw new Error("Cannot Add item to cart");
	}
});

//-------------------------------------------------------------
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	// Check if user exists
	const userExists = await UserModel.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await UserModel.create({
		name,
		email,
		password: hashedPassword,
		carts: [],
	});

	if (user) {
		const token = generateToken(user.id);
		res.cookie("token", token, {
			expires: new Date(Date.now() + 2589000),
			httpOnly: true,
		});
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});
// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	//if alrady logged
	// const { token } = req.cookies;
	// if (token) {
	// 	console.log(
	// 		"someone is already logged in ,first logout and then try again"
	// 	);
	// 	throw new Error(
	// 		"someone is already logged in ,first logout and then try again"
	// 	);
	// }
	const { email, password } = req.body;

	// Check for user email
	const user = await UserModel.findOne({ email });
	// console.log(user);
	if (user && (await bcrypt.compare(password, user.password))) {
		const token = generateToken(user.id);
		res.cookie("token", token, {
			expires: new Date(Date.now() + 2589000),
			httpOnly: true,
		});
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			cart: user.cart,
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

// @desc   logout user
// @route   POST /api/users/logout
// @access  protected
const logoutUser = asyncHandler(async (req, res) => {
	const email = req.user.email;
	res.clearCookie("token", { path: "/" });
	req.user = null;
	// console.log(email, "logged out now");
	res.status(201).json({ msg: `${email}logged out now` });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
//just for testing
const getMe = asyncHandler(async (req, res) => {
	if (req.params.id) {
		const user = await UserModel.findById(req.params.id);
		res.status(200).json(user);
	} else {
		res.status(400);
		throw new Error("Cannot get me/user ");
	}
});

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	getMe,
	addToCart,
	removeFromCart,
};
