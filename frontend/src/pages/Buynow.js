import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	cartItems,
	userProductsReset,
} from "../redux/userproduct/userProductSlice";
//
import "../stylesheets/buynow.css";
import Subtotal from "../components/Subtotal";
import FinalTotal from "../components/FinalTotal";
import Option from "../components/Option";
import Empty from "../components/Empty";

const Buynow = () => {
	const { user } = useSelector((state) => state.auth);
	const { userProducts, isLoading, isSuccess } = useSelector(
		(state) => state.userProducts
	);
	// console.log(cart.length);
	const dispatcher = useDispatch();

	// console.log(cart);

	useEffect(() => {
		dispatcher(cartItems());

		return () => {
			// dispatcher(userProductsReset());
		};
	}, [dispatcher]);
	return (
		<>
			{userProducts && userProducts.length > 0 ? (
				<div className="buynow_section">
					<div className="buynow_container">
						<div className="left_buy">
							<h1>Shopping Cart</h1>
							<p>Select all items</p>
							<span className="leftbuyprice">Price</span>
							<Divider />

							{userProducts.map((e, ind) => {
								return (
									<div key={ind}>
										<div
											className="item_containert"
											key={ind}
										>
											<img src={e.url} alt="imgitem" />
											<div className="item_details">
												<h3>{e.title}</h3>
												<h3 className="diffrentprice">
													₹{e.price}.00
												</h3>
												<p className="unusuall">
													Usually dispatched in 8
													days.
												</p>
												<p>
													Eligible for FREE Shipping
												</p>
												<img
													src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
													alt="logo"
												/>
												<Option deletedata={e._id} />
											</div>
											<h3 className="item_price">
												₹{e.price}.00
											</h3>
										</div>
										<Divider />
									</div>
								);
							})}

							<Subtotal cart={userProducts} />
						</div>
						<FinalTotal cart={userProducts} />
					</div>
				</div>
			) : (
				<Empty />
			)}
		</>
	);
};

export default Buynow;

// thodu changes krya 6 carts ni andr cart htu bt tene remove karine
// je pramane aapdo normal data save 6 te rite bnavyu
// jo carts ni andr cart use kro to tmare map call kravya pachi pn e.cart.discount
