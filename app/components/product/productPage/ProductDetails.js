"use client";
import React, { useState, useContext, useEffect } from "react";
import Form from "../../Forms/Form.js";
import PersonalizeOrder from "./productDetails/PersonalizeOrder.js";
import ProductSignIn from "./productDetails/product_signinForm.js";
import { CartContext } from "../../context/cartContext.js";

const ProductDetails = ({ product }) => {
	console.log("[PRODUCT DETAILS]");
	let { options, id, price, image, name } = product;
	let user = false;

	const [state, setState] = useState("");
	const { addToCart, addMore, inCart } = useContext(CartContext);
	const [selected, setSelected] = useState("description");

	const productDetails = (
		<div className={`product_details_container ${state}`}>
			<p className="product_details collection-name">
				Blossom CollectionBy Tjep.
			</p>
			<h1 className="product_details item-name">Ring Regular</h1>

			<div className="product_details product_details-options">
				<Form
					formWidth="wide"
					formHeader="none"
					mainFormInputs={Object.entries(options).map(([key, value]) => {
						console.log("DROPDOWN KEY", key, "VALUE", value);
						return {
							type: "dropdown",
							name: [key],
							data: value,
							width: "calc((100% - 3vw) / 3)",
						};
					})}
					/* Add to cart and personalize actions */
					formButton={[
						{
							type: `${!user ? "text" : "submit"}`, // AddTo user Cart if signed In else animatein signin/signup form
							value: inCart
								? `$ ${price} - Add More`
								: `$ ${price} - Add To Cart`,
							style: inCart ? "fill" : "border",
							action: {
								alterState: () => {
									inCart
										? addMore({ id })
										: addToCart({ id, name, image, price, options });
								},
							},
						},
						{
							type: "text", // since we will not submit form
							value: "Personalize", // animate personalize form
							style: "border",
							action: { alterState: () => setState("active personalize") },
						},
					]}
				/>
			</div>

			<div className="product_details product_details-details">
				<ul className="product-details-control">
					<li
						className={`control ${selected === "description" && "active"}`}
						onClick={() => setSelected("description")}>
						Description
					</li>
					<li
						className={`control ${selected === "proDetails" && "active"}`}
						onClick={() => setSelected("proDetails")}>
						Product Details
					</li>
					<li
						className={`control ${selected === "sizeChart" && "active"}`}
						onClick={() => setSelected("sizeChart")}>
						Size Chart
					</li>
				</ul>
				<div className="product-details-paragraph">
					<p className={`details ${selected === "description" && "active"}`}>
						DESCRIPTION:crafted 18k rose gold choker is designed like a stem of
						a flower elegantly wrapping around your neck. Showcasing delicate
						details like the heart shaped ending this choker celebrates modern
						femininity.
					</p>
					<p className={`details ${selected === "proDetails" && "active"}`}>
						Pro details:This beautifully crafted 18k rose gold choker is
						designed like a stem of a flower elegantly wrapping around your
						neck. Showcasing delicate details like the heart shaped ending this
						choker celebrates modern femininity.
					</p>
					<p className={`details ${selected === "sizeChart" && "active"}`}>
						sizechart:This beautifully crafted 18k rose gold choker is designed
						like a stem of a flower elegantly wrapping around your neck.
						Showcasing delicate details like the heart shaped ending this choker
						celebrates modern femininity.
					</p>
				</div>
			</div>
		</div>
	);
	const closeIcon = (
		<div
			className={`close ${state}`}
			onClick={() => setState(state.replace("active", "deactive"))}>
			<span className="close_stick"></span>
			<span className="close_stick"></span>
		</div>
	);

	return (
		<section className={`product_details-section ${state}`}>
			{productDetails}
			{closeIcon}
			<PersonalizeOrder expand={state} />
			<ProductSignIn expand={state} />
		</section>
	);
};
export default React.memo(ProductDetails);
