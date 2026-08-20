"use client";
import Footer from "../Navigation/footer";
import ProductFurtherInfo from "./productPage/ProductFurtherInfo";
import ProductSuggestions from "./productPage/ProductSuggestions";
import ProductImages from "./productPage/ProductImage";
import ProductDetails from "./productPage/ProductDetails";
import "./product.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";

const ProductPage = ({ product }) => {
	console.log("[PRODUCT MAIN COMPONENT] ");
	/* useEffect(() => {
		let productPage = document.querySelector(".product_page_container");
		const main = document.querySelector(".main_layout-container");
		let currentScroll = 0;
		let aimScroll = 0;
		let main_speed = 0.05;
		let jumpStart = "no";
		const productScroll = () => {
			if (productPage) {
				console.log("PRODUCT PAGE Scroll");
				main.style.height = productPage.offsetHeight + "px";
				currentScroll = Math.ceil(
					currentScroll + (aimScroll - currentScroll) * main_speed
				);
				productPage.style.top = -1 * currentScroll + "px";

				if (currentScroll !== window.scrollY && jumpStart === "no") {
					requestAnimationFrame(productScroll);
				} else {
					//console.log("JUMP STARTING in CHANGESCROLL");
					jumpStart = "yes";
				}
			}
		};

		productPage.addEventListener(
			"scroll",
			() => {
				aimScroll = window.scrollY;
				console.log("SCROLLLING");
				if (jumpStart === "yes") {
					jumpStart = "no";
					currentScroll = currentScroll + 1;
					changeScroll();
				}
			},
			{ passive: true }
		);
	}); */

	let { cartItems, setInCart } = useContext(CartContext);

	let isInCart = (product) => {
		let inCart = cartItems
			? cartItems.find((item) => item.id === product.id)
			: false;
		if (inCart) {
			console.log("CART INCART", inCart);
			setInCart(true);
		} else {
			setInCart(false);
		}
	};
	setTimeout(() => {
		isInCart({ id: product.id });
	}, 1);

	return (
		<div className="product_page_container">
			<div className="product_maindata-wrapper">
				<ProductImages product={product} />
				<ProductDetails product={product} />
			</div>
			<ProductFurtherInfo />
			<ProductSuggestions />
			<Footer />
		</div>
	);
};

export default ProductPage;
