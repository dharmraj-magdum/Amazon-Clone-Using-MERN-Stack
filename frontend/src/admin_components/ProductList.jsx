import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, productsReset } from "../redux/products/productSlice";
//
import "../stylesheets/adminStyles/productList.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
	const { products } = useSelector((state) => state.products);
	const dispatcher = useDispatch();
	const navigator = useNavigate();

	const [deleted, setDeleted] = useState(false);
	// console.log("list is rendering");
	// console.log(products.length);
	useEffect(() => {
		productsReset();
		setDeleted(false);
		dispatcher(getProducts());
		return () => {
			productsReset();
		};
	}, [deleted]);

	//operations
	const editProduct = (id) => {
		// console.log(id, " is going to edit");
		navigator("/Admin/editproduct/" + id);
	};

	return (
		<div className="productList">
			{products && products.length > 0 ? (
				<div className="product-grid">
					{products.map((ele) => (
						<ProductCard
							key={ele._id}
							product={ele}
							setDeleted={setDeleted}
							editProduct={editProduct}
						/>
					))}
				</div>
			) : (
				<h3>No Product Available</h3>
			)}
		</div>
	);
};

export default ProductList;
