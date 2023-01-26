import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/navbar.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import Rightheader from "./Rightheader";
import { getProducts, productsReset } from "../redux/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout, userReset } from "../redux/user/userSlice";
//
import logo from "../images/amazon_PNG25.png";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);

	const [text, setText] = useState("");
	// only for search
	const { products } = useSelector((state) => state.products);

	// console.log("---------");
	// console.log(user);
	// console.log("---------");
	const dispatcher = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatcher(getProducts());
		return () => {
			// productsReset();
		};
	}, []);

	const [open, setOpen] = useState(false);
	const [liopen, setLiopen] = useState(true);

	const [dropen, setDropen] = useState(false);

	const handleClick = (event) => {
		setOpen(event.currentTarget);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// for logout
	const logoutuser = () => {
		// console.log("logout");
		setOpen(false);
		dispatcher(logout());
		dispatcher(userReset());
		navigate("/");
	};

	// for drawer
	const handelopen = () => {
		setDropen(true);
	};

	const handleClosedr = () => {
		setDropen(false);
	};

	const getText = (text) => {
		setText(text);
		setLiopen(false);
	};

	return (
		<header>
			<nav>
				<div className="left">
					<IconButton className="hamburgur" onClick={handelopen}>
						<MenuIcon style={{ color: "#fff" }} />
					</IconButton>
					{/* here define the right header */}
					<Drawer open={dropen} onClose={handleClosedr}>
						<Rightheader
							userlog={logoutuser}
							menuClose={handleClosedr}
						/>
					</Drawer>
					<div className="navlogo">
						<NavLink to="/">
							{" "}
							<img src={logo} alt="logo" />{" "}
						</NavLink>
					</div>
					<div className="nav_searchbaar">
						<input
							type="text"
							name=""
							onChange={(e) => getText(e.target.value)}
							placeholder="Search Your Products"
						/>
						<div className="search_icon">
							<Search />
						</div>
						{text && products.length > 0 ? (
							<List className="extrasearch" hidden={liopen}>
								{products
									.filter((product) =>
										product.title.longTitle
											.toLowerCase()
											.includes(text.toLowerCase())
									)
									.map((product) => (
										<ListItem key={product.id}>
											<NavLink
												to={`/productdetails/${product._id}`}
												onClick={() => setLiopen(true)}
											>
												{product.title.longTitle}
											</NavLink>
										</ListItem>
									))}
							</List>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="right">
					<div className="nav_btn">
						<NavLink to="/login">Sign in</NavLink>
					</div>
					{user ? (
						<NavLink to="/buynow">
							<div className="cart_btn">
								{user.cart && (
									<Badge
										// badgeContent={0}
										badgeContent={user.cart.length}
										color="primary"
									>
										<ShoppingCart className="carticon" />
									</Badge>
								)}
								<p>Cart</p>
							</div>
						</NavLink>
					) : (
						<NavLink to="/login">
							<div className="cart_btn">
								<ShoppingCart className="carticon" />
								<p>Cart</p>
							</div>
						</NavLink>
					)}

					{user && user.name ? (
						<Avatar
							className="avtar2"
							onClick={handleClick}
							title={user.name.toUpperCase()}
						>
							{user.name[0].toUpperCase()}
						</Avatar>
					) : (
						<Avatar className="avtar" onClick={handleClick} />
					)}

					<div className="menu_div">
						<Menu
							anchorEl={open}
							open={Boolean(open)}
							onClose={handleClose}
							className="component"
						>
							<MenuItem
								onClick={handleClose}
								style={{ margin: 10 }}
							>
								My user
							</MenuItem>
							{user ? (
								<MenuItem
									onClick={logoutuser}
									style={{ margin: 10 }}
								>
									<LogoutIcon
										style={{ fontSize: 16, marginRight: 3 }}
									/>{" "}
									Logout
								</MenuItem>
							) : (
								""
							)}
						</Menu>
					</div>
					<ToastContainer />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;

// user ? <Button id="basic-button"
// aria-controls="basic-menu"
// aria-haspopup="true"
// aria-expanded={open ? 'true' : undefined}
// onClick={handleClick}> <Avatar className="avtar2" title={user.fname.toUpperCase()}>{user.fname[0].toUpperCase()}</Avatar>  </Button> : <Button id="basic-button"
//     aria-controls="basic-menu"
//     aria-haspopup="true"
//     aria-expanded={open ? 'true' : undefined}
//     onClick={handleClick}> <Avatar className="avtar" />
// </Button>
