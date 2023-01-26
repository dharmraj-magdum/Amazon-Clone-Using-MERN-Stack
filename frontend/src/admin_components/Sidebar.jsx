import "../stylesheets/adminStyles/sidebar.css";
import {
	LineStyle,
	Timeline,
	TrendingUp,
	PermIdentity,
	PlayCircleOutline,
	List,
	MailOutline,
	DynamicFeed,
	ChatBubbleOutline,
	WorkOutline,
	Report,
	AddToQueue,
	QueuePlayNext,
	AddAPhotoOutlined,
	Add,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				{/* <div className="sidebarMenu">
					<h3 className="sidebarTitle">Dashboard</h3>
					<ul className="sidebarList">
						<Link to="/Admin/home" className="link">
							<li className="sidebarListItem active">
								<LineStyle className="sidebarIcon" />
								Home
							</li>
						</Link>
					</ul>
				</div> */}
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Quick Menu</h3>
					<ul className="sidebarList">
						<Link to="/" className="link">
							<li className="sidebarListItem">
								<List className="sidebarIcon" />
								Products
							</li>
						</Link>
						<Link to="/Admin/newproduct" className="link">
							<li className="sidebarListItem">
								<Add className="sidebarIcon" />
								Add New
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
}
