import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/products/productSlice";
import {
	addToCart,
	userProductsReset,
} from "../redux/userproduct/userProductSlice";
//
import CircularProgress from "@mui/material/CircularProgress";
import "../stylesheets/cart.css";

const Cart = () => {
	// const { user, isLoading, isSuccess, isError, message } = useSelector(
	// 	(state) => state.auth
	// );
	// console.log("cart rendered");
	const [isadded, setIsadded] = useState(false);
	const { products } = useSelector((state) => state.products);
	const { isLoading, isSuccess } = useSelector((state) => state.userProducts);
	const { user } = useSelector((state) => state.auth);
	const dispatcher = useDispatch();
	const { productId } = useParams();
	// console.log(productId);
	const temp = products.find((prod) => prod._id === productId);

	const [product, setProduct] = useState(temp);

	const navigator = useNavigate();
	// console.log(productId);
	// console.log(products);
	useEffect(() => {
		// console.log(product);
		// dispatcher(getProductById(id))
		// setProduct(temp);
		return () => {
			// userProductsReset();
		};
	});
	// console.log([product]);

	const addtocart = (id) => {
		if (!user) {
			navigator("/login");
			return;
		}
		dispatcher(addToCart(id));
	};

	if (isSuccess && isadded == false) {
		setIsadded(true);
		// setTimeout(() => {
		// 	setIsadded(false);
		// }, 1500);
	}

	return (
		<div className="cart_section">
			{product ? (
				<div className="cart_container">
					<div className="left_cart">
						<img src={product.url} alt="cart" />
						<div className="cart_btn">
							<button
								className="cart_btn1"
								onClick={() => addtocart(product._id)}
							>
								Add to Cart
							</button>
							<NavLink to={"/buynow"}>
								<button className="cart_btn2">Buy Now</button>
							</NavLink>
						</div>
						{isadded && (
							<span
								style={{
									color: "#33a544",
									fontSize: "18px",
									marginTop: "20px",
									fontWeight: "300",
									letterSpacing: "0.4px",
								}}
							>
								Item added to cart succecfully
							</span>
						)}
					</div>
					<div className="right_cart">
						<h3>{product.title}</h3>
						{/* <h5>{product.desc}</h5> */}
						<Divider />
						<p className="mrp">
							M.R.P. : <del>₹{product.price}</del>
						</p>
						<p>
							Deal of the Day :{" "}
							<span style={{ color: "#B12704" }}>
								₹{product.price}.00
							</span>
						</p>
						<p>
							You save :{" "}
							<span style={{ color: "#B12704" }}>
								{" "}
								₹{product.price - product.price - 10}
							</span>
						</p>

						<p className="description">
							About the Iteam :{" "}
							<span
								style={{
									color: "#565959",
									fontSize: "14px",
									fontWeight: "500",
									letterSpacing: "0.4px",
								}}
							>
								{product.desc}
							</span>
						</p>
					</div>
				</div>
			) : (
				<>
					<div className="circle">
						<CircularProgress />
						<h2> Loading....</h2>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
