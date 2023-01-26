const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const {
	getAllProducts,
	getOneProduct,
	cartItems,
	addProduct,
	deleteProduct,
	updateProduct,
} = require("../controllers/productController");
const { protector } = require("../middleware/authHandler");

const productsRouter = express.Router();

productsRouter.get("/all", getAllProducts);
productsRouter.get("/singleProduct/:productId", getOneProduct);

//protected
productsRouter.get("/cartItems/", protector, cartItems);

//only for admin
productsRouter.post("/addProduct", protector, addProduct);
productsRouter.put("/editProduct/:id", protector, updateProduct);
productsRouter.delete("/deleteProduct/:id", protector, deleteProduct);

module.exports = productsRouter;
