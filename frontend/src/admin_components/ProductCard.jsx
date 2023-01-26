import { React, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products/productSlice";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	// marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const ProductCard = ({ product, editProduct, setDeleted }) => {
	const [expanded, setExpanded] = useState(false);

	const dispatcher = useDispatch();

	// console.log(product);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	//more options related
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEditProduct = (id) => {
		editProduct(id);
		setAnchorEl(null);
	};

	//operations
	const handleDeleteProduct = (id) => {
		console.log(id, " is deleted");
		dispatcher(deleteProduct(id));
		setDeleted(true);
		setAnchorEl(null);
	};

	return (
		<Card sx={{ maxWidth: 345, margin: 0 }}>
			<CardHeader
				action={
					<div>
						<Button
							id="basic-button"
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
							sx={{ maxWidth: 5 }}
						>
							<MoreVertIcon />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
							sx={{ right: 0, marginRight: 50 }}
						>
							<MenuItem
								onClick={() => handleEditProduct(product._id)}
							>
								Edit
							</MenuItem>
							<MenuItem
								onClick={() => handleDeleteProduct(product._id)}
							>
								Delete
							</MenuItem>
						</Menu>
					</div>
				}
				title={product.title || "TITLE"}
			/>
			<CardMedia
				component="img"
				height="180"
				width="180"
				image={product.url}
				alt={product.title}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary"></Typography>
			</CardContent>
			<CardActions disableSpacing>
				${product.price || "00.00"}
				{/* <IconButton aria-label="share">
					<ShareIcon />
				</IconButton> */}
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>{product.desc}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default ProductCard;
