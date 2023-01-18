import { Divider } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/user/userSlice";

const Signup = () => {
	const [userdata, setUserdata] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});
	const dispather = useDispatch();
	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	);
	// console.log(udata);

	const adddata = (e) => {
		const { name, value } = e.target;
		// console.log(name,value);

		setUserdata((pre) => {
			return {
				...pre,
				[name]: value,
			};
		});
	};

	const senddata = async (e) => {
		e.preventDefault();

		const { name, email, password, cpassword } = userdata;

		if (password !== cpassword) {
			return;
		}
		const newUser = {
			name,
			email,
			password,
		};
		dispather(register(newUser));

		if (isSuccess) {
			toast.success("Login Successfully done 😃!", {
				position: "top-center",
			});
		} else if (isError) {
			console.log(message);
			toast.error("message 👎!", {
				position: "top-center",
			});
		}
	};

	return (
		<section>
			<div className="sign_container">
				<div className="sign_header">
					<img src="./blacklogoamazon.png" alt="signupimg" />
				</div>
				<div className="sign_form">
					<form method="POST">
						<h1>Create account</h1>
						<div className="form_data">
							<label htmlFor="name">Your name</label>
							<input
								type="text"
								name="name"
								onChange={adddata}
								value={userdata.name}
								id="name"
							/>
						</div>
						<div className="form_data">
							<label htmlFor="email">email</label>
							<input
								type="email"
								name="email"
								onChange={adddata}
								value={userdata.email}
								id="email"
							/>
						</div>
						<div className="form_data">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								onChange={adddata}
								value={userdata.password}
								id="password"
								placeholder="At least 6 characters"
							/>
						</div>
						<div className="form_data">
							<label htmlFor="passwordg">Password again</label>
							<input
								type="password"
								name="cpassword"
								onChange={adddata}
								value={userdata.cpassword}
								id="passwordg"
							/>
						</div>
						<button
							type="submit"
							className="signin_btn"
							onClick={senddata}
						>
							Continue
						</button>

						<Divider />

						<div className="signin_info">
							<p>Already have an account?</p>
							<NavLink to="/login">Sign in</NavLink>
						</div>
					</form>
				</div>
				<ToastContainer />
			</div>
		</section>
	);
};

export default Signup;
