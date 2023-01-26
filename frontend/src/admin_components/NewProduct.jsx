import { React, useState, useRef, useEffect } from "react";
import { storage } from "../firebaseconfig/myfirebaseconfig.js";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, productsReset } from "../redux/products/productSlice";
//
import "../stylesheets/adminStyles/newproduct.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
//===

const NewProduct = () => {
	const { isError, isSuccess, message } = useSelector(
		(state) => state.products
	);
	const dispatcher = useDispatch();

	const [product, setProduct] = useState({
		title: "",
		desc: "",
		price: "",
		category: "",
	});
	const [imgurl, setImgurl] = useState("");
	const [img, setImg] = useState(null);
	let progress = 0;

	const fieldChange = (e) => {
		const value = e.target.value;
		setProduct({ ...product, [e.target.name]: value });
	};

	///=============================
	//related to loader
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [complete, setComplete] = useState(false);

	const buttonSx = {
		...(success && {
			bgcolor: grey[500],
			"&:hover": {
				bgcolor: grey[700],
			},
		}),
		...(complete && {
			bgcolor: green[500],
			"&:hover": {
				bgcolor: green[700],
			},
		}),
	};
	useEffect(() => {
		return () => {
			productsReset();
		};
	}, []);
	//===============

	const upload = async (item) => {
		setLoading(true);
		console.log("uploading image");
		// console.log(item);
		const fileName = new Date().getTime() + item.name;
		const path = `/ProductImages/${fileName}`;
		const uploadTask = storage.ref(path).put(item);
		// const uploadTask = await ref;
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				console.log(error);
				setSuccess(false);
				setLoading(false);
			},
			() => {
				storage
					.ref(path)
					.getDownloadURL()
					.then((url) => {
						console.log(url);
						setImgurl(url);
						setSuccess(true);
						setLoading(false);
					});
			}
		);
	};

	const handleUpload = (e) => {
		e.preventDefault();
		// console.log("uploading product image");
		setComplete(false);
		upload(img);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(product);
		const newProduct = {
			...product,
			url: imgurl,
		};
		dispatcher(addProduct(newProduct));
		setComplete(true);
	};

	return (
		<div className="newProduct">
			<h1 className="addProductTitle">Add New Product</h1>
			<form className="addProductForm">
				<div className="addProductItem">
					<label>Title Of Product</label>
					<input
						type="text"
						id="title"
						name="title"
						onChange={fieldChange}
						required={true}
					/>
				</div>
				<div className="addProductItem">
					<label>Description</label>
					<input
						type="text"
						placeholder="description"
						name="desc"
						onChange={fieldChange}
						required={true}
					/>
				</div>
				<div className="addProductItem">
					<label>Category</label>
					<input
						type="text"
						placeholder="category"
						name="category"
						onChange={fieldChange}
						required={true}
					/>
				</div>
				<div className="addProductItem">
					<label>Price</label>
					<input
						type="text"
						placeholder="price"
						name="price"
						onChange={fieldChange}
						required={true}
					/>
				</div>
				<div className="addProductItem">
					<label>Image</label>
					<input
						type="file"
						id="img"
						name="img"
						onChange={(e) => setImg(e.target.files[0])}
						required={true}
					/>
				</div>
				<div
					// type="submit"
					// className="addProductButton"
					// onClick={handleUpload}
					style={{ marginTop: 25 }}
				>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Box sx={{ m: 1, position: "relative" }}>
							{success ? (
								<Fab
									aria-label="save"
									color="primary"
									sx={buttonSx}
								>
									<CheckIcon />
								</Fab>
							) : (
								<Fab
									aria-label="save"
									color="primary"
									sx={buttonSx}
									onClick={handleUpload}
								>
									<SaveIcon sx={{ fontSize: 25 }} />
								</Fab>
							)}
							{loading && (
								<CircularProgress
									size={68}
									sx={{
										color: green[500],
										position: "absolute",
										top: -6,
										left: -6,
										zIndex: 1,
									}}
								/>
							)}
						</Box>
						{success && (
							<Box sx={{ m: 1, position: "relative" }}>
								<Button
									variant="contained"
									sx={buttonSx}
									disabled={loading}
									onClick={handleSubmit}
								>
									Add Product to Store
								</Button>
								{loading && (
									<CircularProgress
										size={24}
										sx={{
											color: green[500],
											position: "absolute",
											top: "50%",
											left: "50%",
											marginTop: "-12px",
											marginLeft: "-12px",
										}}
									/>
								)}
							</Box>
						)}
					</Box>
				</div>
			</form>
			{/* {isSuccess && <h3>New product added successfully</h3>} */}
			{isError && <h3>Error while adding product..{message}</h3>}
		</div>
	);
};
export default NewProduct;

// imgurl ? (
// 					<button
// 						type="submit"
// 						className="addProductButton"
// 						onClick={handleSubmit}
// 					>
// 						Add
// 					</button>
// 				) : (
// 					<button
// 						type="submit"
// 						className="addProductButton"
// 						onClick={handleUpload}
// 					>
// 						upload
// 					</button>
