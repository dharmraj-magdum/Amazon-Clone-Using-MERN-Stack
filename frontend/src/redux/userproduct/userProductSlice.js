import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userProductService from "./userProductService";

const initialState = {
	userProducts: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// reducer for get my cart items
export const cartItems = createAsyncThunk(
	"userProducts/cartItems",
	async (_, thunkAPI) => {
		try {
			return await userProductService.cartItems();
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
	}
);

// reducer for add to cart
export const addToCart = createAsyncThunk(
	"userProducts/addToCart",
	async (productId, thunkAPI) => {
		try {
			return await userProductService.addToCart(productId);
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
	}
);

// reducer for remove from cart
export const removeFromCart = createAsyncThunk(
	"userProducts/removeFromCart",
	async (productId, thunkAPI) => {
		try {
			return await userProductService.removeFromCart(productId);
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
	}
);

export const userProductSlice = createSlice({
	name: "userProducts",
	initialState,
	reducers: {
		userProductsReset: (state) => initialState,
		//we can right other reduces here directly
	},
	//just like normal reducers we set these reducers
	extraReducers: (builder) => {
		///where diff actions are dispatched in thire cycle these funtions are called
		//in normal reducer we can only perfome once for each rerducer call
		//that imp of extra-reducers
		builder
			.addCase(cartItems.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(cartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// console.log(action.payload);
				state.userProducts = action.payload;
			})
			.addCase(cartItems.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addToCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userProducts.push(action.payload);
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(removeFromCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				let productId = action.payload;
				// console.log(productId);
				state.userProducts = state.userProducts.filter(
					(ele) => ele._id !== productId
				);
			})
			.addCase(removeFromCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { userProductsReset } = userProductSlice.actions;

export default userProductSlice.reducer;
