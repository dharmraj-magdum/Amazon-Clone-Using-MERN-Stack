// import Navbaar from "./Components/header/Navbaar";
// import Newnav from "./Components/newnav/Newnav";
// import Maincomp from "./Components/home/Maincomp";
// import Footer from "./Components/footer/Footer";
// import Signup from "./Components/signup_signin/SignUp";
// import Sign_in from "./Components/signup_signin/Sign_in";
// import Cart from "./Components/cart/Cart";
// import Buynow from "./Components/buynow/Buynow";
import "./App.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
//here we get dispatch funtions directly
import { getProducts, reset } from "./redux/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Newnav from "./components/Newnav";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Buynow from "./pages/Buynow";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

const Layout = () => {
	return (
		<>
			<NavBar />
			<Outlet />
			<Newnav />
		</>
	);
};

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<SignIn />} />
						<Route path="/register" element={<SignUp />} />
						<Route
							path="/productdetails/:productId"
							element={<Cart />}
						/>
						<Route path="/buynow" element={<Buynow />} />
					</Route>
					<Route path="/Admin/*" element={<Admin />} />
					<Route path="*" element={<Home />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
