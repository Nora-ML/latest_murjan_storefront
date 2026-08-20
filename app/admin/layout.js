import AdminNavList from "../components/Admin/AdminNav";
import Search from "../components/general/Search";
import Nav from "../components/Navigation/Nav";
import "./admin.css";

const AdminLayout = ({ children, param }) => {
	console.log("[ADMIN PAGE _LAYOUT ]->param :", param);
	return (
		<>
			<Nav />
			<div className="admin_dashboard">
				<nav className="admin_navigation">
					<AdminNavList />
				</nav>
				<div className="admin_content">
					<h1 className="admin_header admin_display_head_left">{param}</h1>
					<Search className="admin_display_controls_left" />
					{children}
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
