import { useEffect, useState } from "react";
import { storage } from "../firebaseconfig/myfirebaseconfig.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	editProduct,
	getProductById,
	getProducts,
	productsReset,
} from "../redux/products/productSlice";
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

const EditProduct = () => {
	const { products, isError, isSuccess, message } = useSelector(
		(state) => state.products
	);
	const dispatcher = useDispatch();
	const { id } = useParams();
	// console.log(id);

	const temp = products.find((ele) => ele._id === id);
	console.log(temp);
	const { title, desc, price, category } = temp;
	const oldurl = temp.url;
	const [product, setProduct] = useState({ title, desc, price, category });
	const [imgurl, setImgurl] = useState(oldurl);
	const [img, setImg] = useState(null);

	// if (isSuccess) {
	// 	console.log("is success");
	// 	temp = products[0];

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
		dispatcher(getProducts());
		// console.log(temp);
		// temp = temp[0];
		// console.log(temp);
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
				const progress =
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
		setComplete(false);
		upload(img);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newProduct = {
			...product,
			url: imgurl,
		};
		dispatcher(editProduct({ newProduct, id }));
		setComplete(true);
	};

	if (!product) {
		return <h4>invalid product id</h4>;
	}
	return (
		<>
			<div className="newProduct">
				<h1 className="addProductTitle">Update Product Details</h1>
				<form className="addProductForm">
					<div className="addProductItem">
						<label>Title Of Product</label>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="title"
							value={product.title}
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
							value={product.desc}
							onChange={fieldChange}
							required={true}
						/>
					</div>
					<div className="addProductItem">
						<label>Category</label>
						<input
							type="text"
							placeholder="Genre"
							name="category"
							value={product.category}
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
							value={product.price}
							onChange={fieldChange}
							required={true}
						/>
					</div>
					<div className="addProductItem">
						<label>Image Old</label>
						<input
							type="text"
							id="img"
							name="img"
							value={imgurl}
							onChange={(e) => setImgurl(e.target.value)}
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
							{imgurl != oldurl ? (
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
							) : (
								""
							)}
							{success || imgurl == oldurl ? (
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
							) : (
								""
							)}
						</Box>
					</div>
				</form>
				{/* {isSuccess && <h3>product updated successfully</h3>} */}
				{isError && <h3>Error while updating product..{message}</h3>}
			</div>
		</>
	);
};
export default EditProduct;
