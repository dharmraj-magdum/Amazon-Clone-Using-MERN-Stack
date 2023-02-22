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
router.post("/register/", registerUser);
router.post("/login/", loginUser);
router.post("/logout/", logoutUser);
//test
router.post("/getme/", getMe);

//protected
router.post("/addCart/:productId", protector, addToCart);
router.delete("/removeCart/:productId", protector, removeFromCart);

module.exports = router;
