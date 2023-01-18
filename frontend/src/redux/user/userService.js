import axios from "axios";

const API_URL = "/api/user/";

// Register user
const register = async (userData) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL, userData)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// Login user
const login = async (userData) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL + "login", userData)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// Logout user
const logout = async () => {
	localStorage.removeItem("user");
	var response;
	var AxiosError;
	await axios
		.post(API_URL + "logout")
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.removeItem("user");
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
		.post(API_URL + `addCart/${productId}`)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
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
		.post(API_URL + `removeCart/${productId}`)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

const userService = {
	register,
	logout,
	login,
	addToCart,
	removeFromCart,
};

export default userService;
