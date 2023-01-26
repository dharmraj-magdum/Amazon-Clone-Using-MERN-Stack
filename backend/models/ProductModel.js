const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
	},
	category: {
		type: String,
		required: true,
	},
});

const ProductModel = new mongoose.model("ProductModel", productSchema);

module.exports = ProductModel;
