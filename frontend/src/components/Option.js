import React, { useContext, useEffect, useState } from "react";
import { removeFromCart } from "../redux/userproduct/userProductSlice";
import { reset } from "../redux/userproduct/userProductSlice";

import { useDispatch } from "react-redux";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deletedata, id }) => {
	// console.log(deletedata);
	// console.log(id);
	const dispatcher = useDispatch();
	useEffect(() => {
		// nothing
		// return () => {
		// 	dispatcher(reset());
		// };
	}, [dispatcher]);

	return (
		<div className="add_remove_select">
			{/* <select name="" id="">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select> */}
			<p onClick={() => deletedata(id)} style={{ cursor: "pointer" }}>
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
