import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
	products: [],
	//belowe are unnessesary for actual logic
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

//this is act as middlerware for dispatched action to API and actual Reduces
//this will call servise funtions which actually call API
//also API is async but dispatch is not that why it is essential
export const getProducts = createAsyncThunk(
	//prefix string ,payloadCreator
	"products/getProducts",
	async (_, thunkAPI) => {
		try {
			return await productService.getProducts();
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

export const getProductById = createAsyncThunk(
	//prefix string ,payloadCreator
	"products/productId",
	async (productId, thunkAPI) => {
		try {
			return await productService.getProductById(productId);
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

// reducer for get my cart items
export const cartItems = createAsyncThunk(
	"products/cartItems",
	async (_, thunkAPI) => {
		try {
			return await productService.cartItems();
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

//Admin Task only
export const addProduct = createAsyncThunk(
	"products/newProduct",
	async (product, thunkAPI) => {
		try {
			return await productService.addProduct(product);
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

export const editProduct = createAsyncThunk(
	"products/editProduct",
	async (whole, thunkAPI) => {
		try {
			return await productService.editProduct(whole);
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

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (productId, thunkAPI) => {
		try {
			return await productService.deleteProduct(productId);
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
export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		productsReset: (state) => initialState,
		//we can right other reduces here directly
	},
	//just like normal reducers we set these reducers
	extraReducers: (builder) => {
		///where diff actions are dispatched in thire cycle these funtions are called
		//in normal reducer we can only perfome once for each rerducer call
		//that imp of extra-reducers
		builder
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.products = null;
			})
			.addCase(getProductById.pending, (state) => {
				state.products = [];
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
				state.message = "";
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = [];
				// console.log("action.payload", action.payload);
				state.products.push(action.payload);
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.products = null;
			})
			.addCase(cartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(cartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// console.log(action.payload);
				state.products = action.payload;
			})
			.addCase(cartItems.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			//Admin operations
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// console.log(action.payload);
				state.products.push(action.payload);
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(editProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// console.log(action.payload);
				state.products.push(action.payload);
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// console.log(action.payload);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { productsReset } = productSlice.actions;

//this a state mangement reducer slice
//this will get mentioned at store
export default productSlice.reducer;
