import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheets/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backlog from "../images/blacklogoamazon.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/userSlice";

const SignIn = () => {
	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	);
	const dispatcher = useDispatch();
	const navigate = useNavigate();

	const [logdata, setData] = useState({
		email: "",
		password: "",
	});

	// console.log(data);

	const adddata = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);

		setData((pre) => {
			return {
				...pre,
				[name]: value,
			};
		});
	};

	const senddata = async (e) => {
		e.preventDefault();

		const { email, password } = logdata;
		// console.log(email);
		const temp = {
			email,
			password,
		};
		dispatcher(login(temp));
		// while (isLoading) {
		// 	let x = 10;
		// }
		// if (isSuccess) {
		// 	toast.success("Login Successfully done 😃!", {
		// 		position: "top-center",
		// 	});
		// } else if (isError) {
		// 	console.log(message);
		// 	toast.error("message 👎!", {
		// 		position: "top-center",
		// 	});
		// }
	};

	useEffect(() => {
		if (isError) {
			// toast.error(message);
			console.log(message);
		}

		if (isSuccess || (user && user.name)) {
			navigate("/");
		}

		// dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatcher]);

	return (
		<section>
			<div className="sign_container">
				<div className="sign_header">
					<img src={backlog} alt="signupimg" />
				</div>
				<div className="sign_form">
					<form method="POST">
						<h1>Sign-In</h1>

						<div className="form_data">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								onChange={adddata}
								value={logdata.email}
								id="email"
							/>
						</div>
						<div className="form_data">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								onChange={adddata}
								value={logdata.password}
								id="password"
								placeholder="At least 6 characters"
							/>
						</div>
						<button
							type="submit"
							className="signin_btn"
							onClick={senddata}
						>
							Continue
						</button>
					</form>
					<ToastContainer />
				</div>
				<div className="create_accountinfo">
					<p>New to Amazon?</p>
					<button>
						{" "}
						<NavLink to="/register">
							Create your Amazon Account
						</NavLink>
					</button>
				</div>
			</div>
		</section>
	);
};

export default SignIn;
