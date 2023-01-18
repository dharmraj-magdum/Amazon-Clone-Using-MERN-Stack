import React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import "../stylesheets/rightheader.css";
import india from "../images/india.png";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Close from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const Rightheader = ({ userlog, menuClose }) => {
	const { user } = useSelector((state) => state.auth);
	//  this is left drawer bt name is right header
	const handleClick = () => {
		menuClose();
	};

	return (
		<div className="rightheader">
			<div className="right_nav">
				{user ? (
					<Avatar className="avtar2" title={user.name.toUpperCase()}>
						{user.name[0].toUpperCase()}
					</Avatar>
				) : (
					<Avatar className="avtar" />
				)}
				{user ? (
					<h3>Hello, {user.name.split(" ")[0].toUpperCase()}</h3>
				) : (
					""
				)}
				<Close className="closeMenu" onClick={handleClick} />
			</div>
			<div className="nav_btn">
				<NavLink to="/" onClick={handleClick}>
					Home
				</NavLink>
				<NavLink to="/" onClick={handleClick}>
					Shop By Category
				</NavLink>
				<Divider style={{ width: "100%", marginLeft: -20 }} />
				<NavLink to="/" onClick={handleClick} style={{ marginTop: 10 }}>
					Today's Deal
				</NavLink>
				{user ? (
					<NavLink to="/buynow" onClick={handleClick}>
						Your Order
					</NavLink>
				) : (
					<NavLink to="/login" onClick={handleClick}>
						Your Order
					</NavLink>
				)}
				<Divider style={{ width: "100%", marginLeft: -20 }} />
				<div className="flag">
					<NavLink
						to=""
						onClick={handleClick}
						style={{ marginTop: 14 }}
					>
						Settings
					</NavLink>
					<img
						src={india}
						alt="india flag"
						style={{ width: 35, marginLeft: 10 }}
					/>
				</div>

				{user ? (
					<div className="flag">
						<LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
						<h3
							onClick={() => {
								userlog();
								handleClick();
							}}
							style={{ cursor: "pointer", fontWeight: 500 }}
						>
							Log Out
						</h3>
					</div>
				) : (
					<NavLink to="/login" onClick={handleClick}>
						Sign in
					</NavLink>
				)}
			</div>
		</div>
	);
};

export default Rightheader;
