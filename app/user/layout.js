import "./user.css";
import Nav from "../components/Navigation/Nav";
import { ApolloWrapper } from "../lib/apollo_provider";
import Link from "next/link";

const Layout = ({ children }) => {
	console.log("[USER ROUTE LAYOUT] -server");
	return (
		<div className="user_layout_container">
			<div className="user_navigation">
				<Link className="user_navigation-item logo" href="/">
					Murjan
				</Link>
				<ul className="user_tabs-list">
					<li className="user_tabs-list-items">
						<Link href="/user/signup">SignUp</Link>
					</li>
					<li className="user_tabs-list-items">
						<Link href="/user/cart">Cart</Link>
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
