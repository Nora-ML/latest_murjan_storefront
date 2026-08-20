"use client";
import Link from "next/link";
import "./user.css";
import { useSelectedLayoutSegment } from "next/navigation";

const Layout = ({ children }) => {
	let segment = useSelectedLayoutSegment();
	console.log("[USER ROUTE LAYOUT] -segments", segment);
	return (
		<div className="user_layout_container">
			<div className="user_navigation">
				<Link className="user_navigation-item logo" href="/">
					Murjan
				</Link>
				<ul className="user_tabs-list">
					<li
						className={`user_tabs-list-items ${
							segment !== "cart" ? "active" : ""
						} `}>
						{segment === "signin" ? (
							<Link href="/signup">SignUp</Link>
						) : (
							<Link href="/signin">SignIn</Link>
						)}
					</li>
					<li
						className={`user_tabs-list-items ${
							segment === "cart" ? "active" : ""
						} `}>
						<Link
							className={`${segment === "cart" ? "active" : ""}`}
							href="/cart">
							Cart
						</Link>
					</li>
				</ul>
				<Link className="user_navigation-item other" href="/shop">
					Shop
				</Link>
			</div>

			<div className="user_display">{children}</div>
		</div>
	);
};
export default Layout;
