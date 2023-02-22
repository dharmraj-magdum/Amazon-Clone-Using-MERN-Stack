import axios from "axios";
const API_URL_PRODUCT = "/api/products/";
const API_URL_USER = "/api/user/";

axios.defaults.withCredentials = true;

// get  cart items of user
const cartItems = async () => {
	var response;
	var AxiosError;
	await axios
		.get(API_URL_PRODUCT + "cartItems")
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// add item to cart
const addToCart = async (productId) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL_USER + `addCart/${productId}`)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// remove item from cart
const removeFromCart = async (productId) => {
	var response;
	var AxiosError;
	await axios
		.delete(API_URL_USER + `removeCart/${productId}`)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

const userProductService = {
	cartItems,
	addToCart,
	removeFromCart,
};

export default userProductService;
