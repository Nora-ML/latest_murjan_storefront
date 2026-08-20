"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import "./adminNav.css";
const AdminNavList = () => {
	console.log("[ADMIN NAV COMPONENT]");
	let path = usePathname();

	return (
		<ul className="admin_nav_list">
			<li className={path === "/admin" ? "active" : ""}>
				<Link href="/admin">Filter</Link>
			</li>
			<li className={path.includes("admin/products") ? "active" : ""}>
				<Link href="/admin/products">Products</Link>
			</li>
			<li className={path.includes("admin/users") ? "active" : ""}>
				<Link href="/admin/users">Users</Link>
			</li>
			<li className={path.includes("admin/categories") ? "active" : ""}>
				<Link href="/admin/categories">Categories</Link>
			</li>
			<li className={path.includes("admin/collections") ? "active" : ""}>
				<Link href="/admin/collections">Collections</Link>
			</li>
			<li className={path.includes("admin/tags") ? "active" : ""}>
				<Link href="/admin/tags">Tags</Link>
			</li>
			<li className={path.includes("admin/offers") ? "active" : ""}>
				<Link href="/admin/offers">Offers</Link>
			</li>
		</ul>
	);
};
export default AdminNavList;
