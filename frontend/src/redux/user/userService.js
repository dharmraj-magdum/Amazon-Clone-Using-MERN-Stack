import axios from "axios";

const API_URL = "/api/user/";

// Register user
const register = async (userData) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL + "register/", userData)
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
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
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
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	}
};

// // Login user
// const loginWithToken = async (token) => {
// 	var response;
// 	var AxiosError;
// 	console.log(token);
// 	await axios
// 		.post(API_URL + "getme", { token })
// 		.then((res) => {
// 			response = res;
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			AxiosError = err;
// 		});

// 	if (response) {
// 		localStorage.setItem("user", JSON.stringify(response.data));
// 		return response.data;
// 	}
// 	if (AxiosError) {
// 		const message = AxiosError.response.data.message;
// 		// console.log(message);
// 		throw new Error(message);
// 	}
// };

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

const userService = {
	register,
	logout,
	login,
	// loginWithToken,
};

export default userService;
