import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
// Helper Functions
import { isAuth, logout } from "../../requests/auth.js";

//Website Navigation

const NavMobile = ({ currentUser }) => {
	console.log("-- MOBILE NAVBAR");
	const path = useRouter().pathname;
	const [activateNav, setActivateNav] = useState(false);

	const [burgerState, setBurgerState] = useState(false);

	const { role, name, access } = currentUser
		? Object.values(currentUser)[0]
		: {};

	useEffect(() => {
		console.log("MOBILE NAVEBAR -- useEffect path", path);
		setBurgerState(false);
		let navBar = document.querySelector(".navContainer")
			? document.querySelector(".navContainer")
			: document.querySelector(".navbar-mobile");

		if (path.includes("..productID")) {
			navBar.style.backgroundColor = "transparent";
			navBar.style.border = "none";
			navBar.style.color = "black";
		} else {
			console.log("[PRODUCT USEEFFCT]:", path);
			navBar.style.backgroundColor = "var(--light_80)";
			navBar.style.borderBottom = "1px solid var(--light_87)";
			navBar.style.color = "var(--light_87)";
		}
	}, [path]);

	const navIndependentItem = () => {
		return (
			<h2 className="navbar-head">
				{path.includes("/shop") ? (
					<Link href="/">Murjan</Link>
				) : (
					<Link href="/shop">Shop</Link>
				)}
			</h2>
		);
	};

	const burgerIcon = () => {
		return (
			<div
				className={`burger-icon burger-icon${burgerState ? "--active" : ""}`}
				onClick={() => setBurgerState(!burgerState)}>
				<div className="line line1"></div>
				<div className="line line2"></div>
			</div>
		);
	};
	const navigationContent = () => {
		return (
			<div className={`navbar-burger_container ${burgerState ? "active" : ""}`}>
				<ul className={`burger-list ${burgerState ? "active" : ""}`}>
					{isAuth() && role === "admin" ? (
						<li
							className={`burger-list__items${
								path.includes("admin") ? "active" : ""
							}`}>
							<Link href="/admin">{name}</Link>
						</li>
					) : isAuth() && role === "customer" ? (
						<li
							className={`burger-list__items${
								path.includes("user") ? "active" : ""
							}`}>
							<Link href="/user">{name}</Link>
						</li>
					) : (
						<li
							className={`burger-list__items ${
								path.includes("signin") ? "active" : ""
							}`}>
							<Link href="/signin">SignIn</Link>
						</li>
					)}
					<li className="burger-list__items">
						<Link href="/">Cart</Link>
					</li>
					<li className="burger-list__items">
						<Link href="/">favourites</Link>
					</li>
					<li className="burger-list__items">
						<Link href="/">search</Link>
					</li>
					{isAuth() && (
						<li className="burger-list__items" onClick={logout}>
							<Link href="/">LogOut</Link>
						</li>
					)}
				</ul>
			</div>
		);
	};

	return (
		<>
			<nav className={`navbar-mobile ${burgerState ? "active" : ""}`}>
				{navIndependentItem()}
				{burgerIcon()}
			</nav>
			{navigationContent()}
		</>
	);
};
export default NavMobile;
