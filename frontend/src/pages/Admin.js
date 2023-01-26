import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import NewProduct from "../admin_components/NewProduct";
import EditProduct from "../admin_components/EditProduct";
import ProductList from "../admin_components/ProductList";
import Sidebar from "../admin_components/Sidebar";
import Topbar from "../admin_components/Topbar";
//
import "../stylesheets/adminStyles/home.css";

const Admin = () => {
	const { user } = useSelector((state) => state.auth);
	const navigator = useNavigate();
	useEffect(() => {
		if (!user || !user.isAdmin) {
			navigator("/");
		}
		return () => {};
	}, []);

	return (
		<div className="home">
			<Topbar />
			<div className="container">
				<Sidebar />
				<Routes>
					<Route path="/" element={<ProductList />} />
					<Route path="/newproduct" element={<NewProduct />} />
					<Route path="/editproduct/:id" element={<EditProduct />} />
				</Routes>
			</div>
		</div>
	);
};

export default Admin;
