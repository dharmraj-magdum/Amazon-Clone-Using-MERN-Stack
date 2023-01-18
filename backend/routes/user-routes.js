const express = require("express");
const {
	registerUser,
	loginUser,
	getMe,
	logoutUser,
	addToCart,
	removeFromCart,
} = require("../controllers/userController");

const router = express.Router();
const { protector } = require("../middleware/authHandler");
//
router.post("/", registerUser);
router.post("/login/", loginUser);
//just to test
router.get("/me/:id", getMe);

//protected
router.post("/logout/", protector, logoutUser);
router.post("/addCart/:productId", protector, addToCart);
router.post("/removeCart/:productId", protector, removeFromCart);

module.exports = router;
