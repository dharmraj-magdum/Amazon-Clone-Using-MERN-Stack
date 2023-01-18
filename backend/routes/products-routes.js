const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const {
	getAllProducts,
	getOneProduct,
	cartItems,
	// getUserProducts,
	// addProduct,
	// deleteProduct,
	// updateProduct,
} = require("../controllers/productController");
const { protector } = require("../middleware/authHandler");

// const DefaultData = require("../defaultdata");
// //set some static data  towork wiht
// DefaultData();

const productsRouter = express.Router();

//all routes to Product are protected.

// productsRouter.get("/", protector, getUserProducts);
// productsRouter.post("/", upload.single("image"), addProduct);
// productsRouter.put("/:id", updateProduct);
// productsRouter.delete("/:id", deleteProduct);
productsRouter.get("/all", getAllProducts);
productsRouter.get("/cartItems/", protector, cartItems);
// productsRouter.get("/all", protector, getAllProducts);
productsRouter.get("/:productId", getOneProduct);
//
module.exports = productsRouter;
