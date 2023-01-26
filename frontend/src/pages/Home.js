import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/products/productSlice";
//
import "../stylesheets/home.css";
import NavBar from "../components/NavBar";
import Newnav from "../components/Newnav";
import Banner from "../components/Banner";
import Slide from "../components/Slide";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { products } = useSelector((state) => state.products);
	const { user } = useSelector((state) => state.auth);
	// console.log(products);

	const dispatcher = useDispatch();

	const navigator = useNavigate();
	useEffect(() => {
		// setTimeout(loadData(), 2000);
		// console.log("useeffect runned");
		if (user && user.isAdmin) {
			navigator("/Admin");
		}
	}, [dispatcher]);

	return (
		<>
			{/* <NavBar />
			<Newnav /> */}
			<div className="home_section">
				<div className="banner_part">
					<Banner />
				</div>
				<div className="slide_part">
					<div className="left_slide">
						<Slide title="Deal Of The Day" products={products} />
					</div>
					<div className="right_slide">
						<h4>Festive latest launches</h4>
						<img
							src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
							alt="rightimg"
						/>
						{/* <Link href="#">see more</Link> */}
						<a href="/home">see more</a>
					</div>
				</div>

				<Slide title="Today's Deal" products={products} />

				<div className="center_img">
					<img
						src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
						alt=""
					/>
				</div>

				<Slide title="Best Seller" products={products} />
				<Slide title="Upto 80% off" products={products} />
			</div>

			<Divider />
		</>
	);
};

export default Home;
