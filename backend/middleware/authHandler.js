const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { colors } = require("colors");
const userModel = require("../models/UserModel");
const productModel = require("../models/ProductModel");

const protector = asyncHandler(async (req, res, next) => {
	//check authization string available or NOT
	// console.log(`${req.cookies}`.red);
	// console.log(`${req.cookies.token}`.red);
	const { token } = req.cookies;
	if (token) {
		// console.log(`${token}`.yellow);
		try {
			// console.log(`token : ${token}`.yellow);
			const { id } = jwt.verify(token, process.env.JWT_SECRET);

			// console.log(`id : ${id}`.bgCyan);
			if (!id) {
				res.status(401);
				throw new Error("token is not authorized");
			} else {
				// const user = await userModel.findById(id).select("-password");
				//if we get user,store it in req object to provide further access
				// console.log(user);
				// console.log(`${id}`.yellow);
				const user = await userModel.findById(id);
				// console.log(user);
				// const { name, email } = user;
				// console.log("name-", name, email);
				req.user = user;
				next();
			}
		} catch (error) {
			res.status(401);
			console.log(`${error}`.red);
			throw new Error("WRONG TOKEN /CANT verify /");
		}
	} else {
		res.status(401);
		throw new Error(
			"dont have access due NO TOKEN so no authontication available"
		);
	}
});

module.exports = { protector };
