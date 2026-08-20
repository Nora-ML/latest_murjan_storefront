"use client";
import React, { useEffect } from "react";
//import { SizeContext } from "../context/sizeContext";
import EditDrawer from "./admin/editDrawer";
import Image from "next/image";
import AdminProductControl from "./admin/adminControl";
import { useRouter } from "next/navigation";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "./shop_items.css";

const ShopItems = ({ products }) => {
	console.log("[SHOP ITEMS - COMPONENT]");

	let router = useRouter();
	let user = "admin";

	const hideMainScroll = () => {
		/* let scrollBarWidth = window.innerWidth - document.body.offsetWidth; */
		let body = document.querySelector("body");
		/* body.style.marginRight = `${scrollBarWidth}`; */
		body.style.overflow = "hidden";
	};
	const handleClick = (e, index) => {
		let parentContainer = document.querySelector(".shop_page_container");
		let el = e.target;
		let parent = el.parentElement;

		let elWidth = parent.clientWidth;
		let elleft = parent.getBoundingClientRect().left;
		let eltop = parent.getBoundingClientRect().top;
		let elHeight = parent.clientHeight;
		let elImage = el.src;

		let newImage = document.createElement("img");
		let overlay = document.createElement("div");
		overlay.classList.add("overlay");

		newImage.style.position = "fixed";
		newImage.style.top = `${eltop}px`;
		newImage.style.left = `${elleft}px`;

		newImage.style.zIndex = 4;

		newImage.setAttribute("id", `random-${index}`);

		newImage.width = elWidth;
		newImage.src = elImage;
		newImage.height = elHeight;
		parentContainer.append(newImage);
		parentContainer.append(overlay);

		let find = document.getElementById(`random-${index}`);

		//find.classList.add("expand");
		find.animate(
			[
				{ backgroundColor: "var(--light_87)" },
				{
					backgroundColor: "var(--light_87)",
					top: 0,
					left: 0,
					right: 0,
					width: "55vw",
					opacity: 1,
					height: "100vh",
					border: "none",
					clipPath: "inset(0% 0% 0% 0%)",
				},
			],
			{ duration: 1000, delay: 200 }
		);
		//overlay.classList.add("animate");

		overlay.animate(
			{
				opacity: 0.8,
				backgroundColor: "var(--light_80)",
			},
			{ duration: 4000, easing: "cubic-bezier(1,0,0.2,1)" }
		);

		hideMainScroll();

		setTimeout(() => {
			console.log("Inserted Image lag");
			router.push(`/product/${index}`);
			setTimeout(() => {
				console.log("Inserted Image Remove");
				find.classList.add("lag");
				overlay.remove();
				setTimeout(() => {
					find.remove();
				}, 500);
			}, 1800);
		}, 500);
	};

	useEffect(() => {
		let targets = document.querySelectorAll(".shop_item");

		let run = () => {
			let callback = (entries, observer) => {
				entries.forEach((entry, index) => {
					let elem = entry.target;
					let isActive = elem.classList[1] === "active";
					if (entry.isIntersecting && !isActive) {
						elem.classList.add("active");
					}
				});
			};

			let options = {
				rootMargin: "0px",
				threshold: 0.2,
			};

			let observer = new IntersectionObserver(callback, options);

			targets.forEach((target) => {
				observer.observe(target);
			});
		};

		window.addEventListener("scroll", run);

		return () => window.removeEventListener("scroll", run);
	});

	return (
		<>
			<ul className="shop_large_container">
				{products.map((product) => {
					let { name, price, id, image } = product;

					return (
						<li className="shop_item" key={id}>
							<div
								className="image_wrapper"
								onClick={(e) => handleClick(e, id)}>
								<img
									className="shop_item-img"
									src={image[0]}
									alt="random image"
								/>
							</div>
							<div className="shop_item-details">
								<p className="shop_item_details-name">{name}</p>
								<p className="shop_item_details-price">{price}</p>
							</div>
							{/* <Cart product={id} /> */}
							{user === "admin" && <AdminProductControl productId={id} />}
						</li>
					);
				})}
			</ul>
		</>
	);
};
export default ShopItems;
