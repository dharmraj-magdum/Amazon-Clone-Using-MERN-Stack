import React from "react";
import "../stylesheets/adminStyles/topbar.css";
import {
	NotificationsNone,
	Language,
	Settings,
	LogoutRounded,
} from "@mui/icons-material";
import { logout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
	const dispatcher = useDispatch();
	const navigator = useNavigate();
	const logoutUser = () => {
		// console.log("logging our from admin page");
		dispatcher(logout());
		navigator("/");
	};

	return (
		<div className="topbar">
			<div className="topbarWrapper">
				<div className="topLeft">
					<span className="logo">Amazon ADMIN</span>
				</div>
				<div className="topRight">
					{/* <div className="topbarIconContainer">
						<NotificationsNone />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer">
						<Language />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer">
						<Settings />
					</div>  */}
					<img
						src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						alt=""
						className="topAvatar"
					/>
					<div className="topbarIconContainer" onClick={logoutUser}>
						<LogoutRounded
							style={{ fontSize: 16, marginLeft: 5 }}
						/>
						Logout
					</div>
				</div>
			</div>
		</div>
	);
}
