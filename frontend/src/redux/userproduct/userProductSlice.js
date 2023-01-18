import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userProductService from "./userProductService";

const initialState = {
	userProducts: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// export const getUserProducts = createAsyncThunk(
// 	//prefix string ,payloadCreator
// 	"userProducts/getUserProducts",
// 	async (_, thunkAPI) => {
// 		try {
// 			return await userProductService.getProducts();
// 		} catch (error) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString();
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );

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

//this a slice of product
//which conatin all actions and reducers ffor that actions
export const userProductSlice = createSlice({
	name: "userProducts",
	initialState,
	reducers: {
		reset: (state) => initialState,
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
				state.userProducts = null;
			});
	},
});

export const { reset } = userProductSlice.actions;

//this a state mangement reducer slice
//this will get mentioned at store
export default userProductSlice.reducer;
