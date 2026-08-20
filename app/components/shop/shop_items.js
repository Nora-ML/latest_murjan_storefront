"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditDrawerContextProvider from "../context/editDrawerContext";
//components
import ShopItemDelete from "./admin/shop_Item_delete";
import Modal from "../general/modal";
import Form from "../Forms/Form";
import ShopItemEdit from "./admin/shop_Item_edit";
import "./shop_items.css";

const ShopItems = ({ products }) => {
	console.log("[SHOP ITEMS - COMPONENT]");
	let [deleteState, setDeleteState] = useState(false);
	let router = useRouter();
	let user = "admin";
	const handleClick = (e, index) => {
		console.log("CLICKED ITEM", e.target);
		let parentContainer = document.querySelector(".main_layout-container");
		let el = e.target;
		let parent = el.parentElement;

		let elWidth = parent.clientWidth;
		let elleft = parent.getBoundingClientRect().left;
		let eltop = parent.getBoundingClientRect().top;
		let elHeight = parent.clientHeight;
		let elImage = el.src;

		let newImage = document.createElement("img");
		/* overlay.classList.add("overlay"); */
		newImage.style.position = "fixed";
		newImage.style.objectFit = "contain";
		newImage.style.top = `${eltop}px`;
		newImage.style.left = `${elleft}px`;
		newImage.height = elHeight;
		newImage.width = elWidth;
		newImage.style.zIndex = 3;
		newImage.style.backgroundColor = "var(--light_89)";
		newImage.src = elImage;
		newImage.setAttribute("id", `image-${index}`);

		let overlay = document.createElement("div");
		overlay.setAttribute("id", `overlay-${index}`);

		parentContainer.append(overlay);
		parentContainer.append(newImage);

		overlay.animate(
			[
				{
					position: "fixed",
					zIndex: 2,
					opacity: 0,
					backgroundColor: "var(--light_87)",
					//width: elWidth,
					width: elWidth,
					height: elHeight,
					top: `${eltop}px`,
					left: `${elleft}px`,
				},
				{
					position: "fixed",
					opacity: 1,
					backgroundColor: "var(--light_87)",
					zIndex: 2,
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				},
			],
			{ duration: 650, easing: "cubic-bezier(0,1,1,1)", fill: "forwards" }
		);
		newImage.animate(
			[
				{
					top: `${eltop}px`,
					left: `${elleft}px`,
					width: elWidth,
					height: elHeight,
					opacity: 1,
				},
				{
					top: 0,
					left: 0,
					right: 0,
					width: "55%",
					opacity: 1,
					height: "100%",
				},
			],

			{
				duration: 650,
				/* delay: 50, */
				fill: "forwards",
				easing: "cubic-bezier(1,0,0.2,1)",
			}
		);

		setTimeout(() => {
			router.push(`/product/${index}`);
			//console.log("NORA ROUTE");
		}, 200);
	};

	let formWidth = "narrow";

	const deleteModal = (
		<Modal>
			<h2>This product will be Permanently deleted?</h2>
			<Form
				mutationFunction=""
				formWidth={formWidth}
				formButton={[{ type: "submit", style: "fill", value: "Accept" }]}
			/>
		</Modal>
	);
	return (
		<>
			<ul className="shop_large_container">
				{products.map((product) => {
					let { name, price, id, image } = product;

					return (
						<li className="shop_item" key={id}>
							<div className="shop_item_img-wrapper">
								<img
									className="shop_item-img"
									src={image[0]}
									alt="random image"
									onClick={(e) => handleClick(e, id)}
								/>
							</div>

							<p className="shop_item_details-name hero_animation">
								<span className="shop_text-reveal"> {name}</span>
							</p>
							<Link
								href={`/product/${id}`}
								prefetch
								style={{ display: "hidden" }}></Link>
							<p className="shop_item_details-price hero_animation">
								<span className="shop_text-reveal"> {price}</span>
							</p>

							{/* <Cart product={id} /> */}
							{user === "admin" && (
								<div className="shop_item-admin">
									<img
										className="shop_item-admin_icons delete"
										onClick={() => setDeleteState(true)}
									/>
									<EditDrawerContextProvider>
										<ShopItemEdit productId={id} />
									</EditDrawerContextProvider>
								</div>
							)}
						</li>
					);
				})}
			</ul>
			{deleteState && deleteModal}
		</>
	);
};
export default ShopItems;
