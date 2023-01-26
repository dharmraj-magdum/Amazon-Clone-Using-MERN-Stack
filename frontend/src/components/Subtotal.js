import React from "react";
import { useEffect, useState } from "react";

const Subtotal = ({ cart }) => {
	const [price, setPrice] = useState(0);

	useEffect(() => {
		totalAmount();
	}, [cart]);

	const totalAmount = () => {
		let price = 0;
		cart.map((item) => {
			price += new Number(item.price);
		});
		setPrice(price);
	};

	return (
		<div className="sub_item">
			<h3>
				Subtotal ({cart.length} items):
				<strong style={{ fontWeight: "700", color: "#111" }}>
					{" "}
					₹{price}.00
				</strong>
			</h3>
		</div>
	);
};

export default Subtotal;
