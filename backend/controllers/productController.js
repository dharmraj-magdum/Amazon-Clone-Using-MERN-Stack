const asyncHandler = require("express-async-handler");
// const mongoose = require("mongoose");

const ProductModel = require("../models/ProductModel");
// const UserModel = require("../models/UserModel");

// @desc    Get all Product for seeing to anyone
// @route   GET /api/Products/all/
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
	const products = await ProductModel.find();
	// console.log(products);
	res.status(200).json(products);
});

// @desc    Get all Product for seeing to anyone
// @route   GET /api/Products/all/
// @access  Public
const getOneProduct = asyncHandler(async (req, res) => {
	// const { name, email } = req.user;
	// console.log("name-", name, email);
	const productId = req.params.productId;
	const Product = await ProductModel.findById(productId);

	if (!Product) {
		res.status(400);
		throw new Error("Product not found");
	}
	res.status(200).json(Product);
});

// populate products in cart
const cartItems = asyncHandler(async (req, res) => {
	// console.log("getting cart items");
	if (!req.user) {
		console.log("user not fount to see cart");
		throw new Error("cannot see cart as user not found");
	}
	let products = [];
	// console.log(req.user.cart.length);
	for (let index = 0; index < req.user.cart.length; index++) {
		const id = req.user.cart[index].toString();
		// console.log(id);
		let product = await ProductModel.findById(id);
		// console.log(product);
		products.push(product);
	}
	// console.log(products);
	res.status(200).json(products);
	// console.log("cart iteams fetched");
});

//Admin privilages only
//---------------------------------------------------------------------------
// // @desc    Set Product
// // @route   POST /api/Products
// // @access  Private
const addProduct = asyncHandler(async (req, res) => {
	// console.log("image in controller--", req.body.image);
	const productobj = req.body;
	// console.log("productobj", productobj);
	if (req.user.isAdmin) {
		const newProduct = new ProductModel(productobj);
		try {
			const savedProduct = await newProduct.save();
			res.status(201).json(savedProduct);
		} catch (err) {
			res.status(500).json(err);
			throw new Error(err);
		}
	} else {
		res.status(403).json("You are not allowed!");
		throw new Error(err);
	}
});

// @desc    Update Product
// @route   PUT /api/Products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
	const productobj = req.body;
	if (req.user.isAdmin) {
		try {
			const updatedProduct = await ProductModel.findByIdAndUpdate(
				req.params.id,
				{
					$set: productobj,
				},
				{ new: true }
			);

			res.status(200).json(updatedProduct);
		} catch (err) {
			res.status(500).json(err);
			throw new Error(err);
		}
	} else {
		console.log("You are not allowed!");
		throw new Error("You are not allowed!");
	}
});

// // @desc    Delete Product
// // @route   DELETE /api/Products/:id
// // @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await ProductModel.findByIdAndDelete(req.params.id);
			res.status(200).json("The Product has been deleted...");
		} catch (err) {
			console.log(err);
			throw new Error(err);
		}
	} else {
		res.status(403).json("You are not allowed!");
		throw new Error("You are not allowed!");
	}
});

module.exports = {
	getAllProducts,
	getOneProduct,
	cartItems,
	addProduct,
	updateProduct,
	deleteProduct,
};
