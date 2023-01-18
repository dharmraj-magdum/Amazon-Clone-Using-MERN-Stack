import React, { useContext, useEffect, useState } from "react";
import { removeFromCart } from "../redux/user/userSlice";
import { reset } from "../redux/userproduct/userProductSlice";

import { useDispatch } from "react-redux";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deletedata }) => {
	// console.log(deletedata);
	const [deleted, setDeleted] = useState(false);
	const dispatcher = useDispatch();
	useEffect(() => {
		// nothing
		// return () => {
		// 	dispatcher(reset());
		// };
	}, [dispatcher, deleted]);
	const removeItem = (id) => {
		setDeleted(true);
		dispatcher(removeFromCart(id));
	};

	return (
		<div className="add_remove_select" key={deletedata}>
			<select name="" id="">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select>
			<p
				onClick={() => removeItem(deletedata)}
				style={{ cursor: "pointer" }}
			>
				remove
			</p>
			<span>|</span>
			<p className="forremovemedia">Save Or Later</p>
			<span>|</span>
			<p className="forremovemedia">See More like this</p>
			<ToastContainer />
		</div>
	);
};

export default Option;
