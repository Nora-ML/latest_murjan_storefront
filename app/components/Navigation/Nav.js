"use client";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import BurgerIcon from "./navComponents/BurgerIcon";
import User from "./navComponents/User";
import Cart from "./navComponents/Cart";
import { CartContext } from "../context/cartContext";
import { usePathname } from "next/navigation";
import "./nav.css";

const Nav = ({ currentUser }) => {
	const path = usePathname();
	console.log("[NAV BAR],currentUser:", currentUser, "PATH", path);
	const [activateNav, setActivateNav] = useState(false);
	const [burgerState, setBurgerState] = useState(false);

	useEffect(() => {
		console.log("[NAV BAR useEffect] path:", path);
		let body = document.querySelector("body");
		let mainLayout = document.querySelector(".main_layout-container");
		if (path.includes("product")) {
			let scrollBarWidth = window.innerWidth - body.offsetWidth;
			body.style.marginRight = `${scrollBarWidth}`;
			body.style.overflowY = "hidden";
			mainLayout.style.overflowY = "auto";
		} else {
			body.style.overflowY = "auto";
			mainLayout.style.overflowY = "hidden";
		}
	}, [path]);

	const navigation = () => {
		return (
			<ul className={`navContainer_ul ${burgerState ? "active" : ""}`}>
				<ul className="navContainer_section">
					<Cart />
					<li
						className={`navContainer-li cart ${
							path.includes("shop") ? "" : "remove"
						}`}>
						<Link href="/">Favourites</Link>
					</li>
					<li
						className={`navContainer-li ${
							path.includes("shop") ? "remove" : ""
						}`}>
						<Link href="/shop">Shop</Link>
					</li>
				</ul>

				<User user={currentUser} />
			</ul>
		);
	};

	// If path="/" transparent on  hero and slides in after hero in place, colored on posthero, trans on gem
	return (
		<div
			className={`navContainer ${path.includes("product") && "transparent"} ${
				path.includes("user") && "hide"
			}`}>
			<Link className={`navContainer-logo ${burgerState && "active"}`} href="/">
				Murjan
			</Link>
			{navigation()}
			<BurgerIcon burgerState={burgerState} setBurgerState={setBurgerState} />
		</div>
	);
};
export default Nav;
