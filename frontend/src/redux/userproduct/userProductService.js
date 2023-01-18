import axios from "axios";
const API_URL = "/api/products/";

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

const userProductService = {
	cartItems,
};

export default userProductService;
