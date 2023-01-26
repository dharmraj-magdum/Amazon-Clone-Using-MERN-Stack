import axios from "axios";

//here we actually call API
axios.defaults.withCredentials = true;

const API_URL = "/api/products/";
const getProducts = async () => {
	var response;
	var AxiosError;
	await axios
		.get(API_URL + "all")
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});
	// console.log(response.data);

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};
const getProductById = async (productId) => {
	var response;
	var AxiosError;
	await axios
		.get(API_URL + productId)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});
	// console.log(response.data);

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// get  cart items of user
const cartItems = async () => {
	var response;
	var AxiosError;
	await axios
		.get(API_URL + "cartItems")
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

//Admin task only
const addProduct = async (product) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL + "addProduct", product)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
	if (response) {
		return response.data;
	}
};

const editProduct = async ({ newProduct, id }) => {
	var response;
	var AxiosError;
	await axios
		.put(API_URL + "editProduct/" + id, newProduct)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
	if (response) {
		return response.data;
	}
};

const deleteProduct = async (productId) => {
	var response;
	var AxiosError;
	await axios
		.delete(API_URL + "deleteProduct/" + productId)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
	if (response) {
		return response.data;
	}
};

const productService = {
	getProducts,
	getProductById,
	cartItems,
	addProduct,
	editProduct,
	deleteProduct,
};

export default productService;
