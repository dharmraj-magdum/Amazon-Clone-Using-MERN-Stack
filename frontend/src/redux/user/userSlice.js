import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
// console.log(localStorage.getItem("token"));
// console.log(Cookies.get("token"));
// console.log(document.cookie.split(";").length);

// var user = null;
// let cookieToken = document.cookie.split(";")[0];
// if (cookieToken) {
// 	cookieToken = cookieToken.split("=")[1];
// 	user = await userService.loginWithToken(cookieToken);
// }

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await userService.register(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await userService.login(user);
	} catch (error) {
		// console.log("error in slice--", error);
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		// console.log("before reject", message);
		return thunkAPI.rejectWithValue(message);
	}
});
// // Login user
// export const loginWithToken = createAsyncThunk(
// 	"auth/login",
// 	async (token, thunkAPI) => {
// 		try {
// 			return await userService.loginWithToken(token);
// 		} catch (error) {
// 			// console.log("error in slice--", error);
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString();
// 			// console.log("before reject", message);
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		return await userService.logout();
	} catch (error) {
		// console.log("error in slice--", error);
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		// console.log("before reject", message);
		return thunkAPI.rejectWithValue(message);
	}
});

export const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.user = null;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
			console.log("reset of auth slice");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// .addCase(loginWithToken.pending, (state) => {
			// 	state.isLoading = true;
			// })
			// .addCase(loginWithToken.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isSuccess = true;
			// 	state.user = action.payload;
			// })
			// .addCase(loginWithToken.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isError = true;
			// 	state.message = action.payload;
			// 	state.user = null;
			// })
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
