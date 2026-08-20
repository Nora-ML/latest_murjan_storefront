"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ProductImages = ({ product }) => {
	console.log("[PRODUCT_IMAGE] product", product);
	let [state, setState] = useState(1);
	let [lag, setLag] = useState(0);

	let runHero = () => {
		console.log("RUNNING HERO");
		let cardToExpand = 1;
		let cardToScaleRelocate = 0;

		setInterval(() => {
			let heroCards = document.querySelectorAll(".shop_item-img-new");
			if (1 < 10) {
				heroCards.forEach((card, index) => {
					card.classList.remove("out");
					heroCards[cardToScaleRelocate].animate(
						[
							{
								scale: "1",

								/* objectPosition: "50% 50%", */
								width: "100%",
								transform: "none",
								height: "100%",
								zIndex: 1,
							},
							{ zIndex: 1, scale: 2, transform: "none", offset: 0.1 },
							{ zIndex: 1, scale: 2, transform: "none", offset: 0.85 },

							{
								offset: 0.9,
								scale: 0,
								transform: "translateX(100vw)",
							},
							{
								scale: "1",
								zIndex: 3,
								boxShadow: "0 2px 8px 1px var(--counter_dark)",
								height: "var(--cardHeight)",
								width: "var(--cardWidth)",
								transform: "translateX(calc(var(--cardWdthMargin) * 4))",
								/* objectPosition: " 50% 50%", */
							},
						],
						{
							duration: 1500,
							easing: "cubic-bezier(1,0,0.2,1)",
							fill: "forwards",
						}
					);
					heroCards[cardToExpand].classList.add("out");
					heroCards[cardToExpand].animate(
						{
							/* transition-timing-function: cubic-bezier(0, 1, 0.5, 1); */
							/* objectPosition: "50% 100%", */

							scale: "1",
							transform: "none",

							marginRight: " 0",
							width: "100%",
							height: "100%",
							zIndex: 2,
						},
						{
							duration: 1000,
							fill: "forwards",
							easing: "cubic-bezier(1,0,0.5,1)",
						}
					);

					if (index !== cardToScaleRelocate && index !== cardToExpand) {
						let styles = window.getComputedStyle(card);
						let { m41: prevPosition } = new WebKitCSSMatrix(styles.transform);
						card.animate(
							{
								transform: `translateX(calc(${prevPosition}px - var(--cardWdthMargin)))`,
							},
							{
								duration: 1000,
								fill: "forwards",
							}
						);
					}
				});

				/* hero.append(heroCards[cardToScaleRelocate]); */
				cardToExpand === 4 //numberof cards -1
					? (cardToExpand = 0)
					: cardToExpand++;
				cardToScaleRelocate = cardToExpand - 1 < 0 ? 4 : cardToExpand - 1;
			}
		}, 2000);
	};

	let slideIn = () => {
		console.log("SLIDING IMAGES");
		let heroCards = document.querySelectorAll(".shop_item-img-new");

		heroCards.forEach((card, index) => {
			console.log("SLIDING IMAGES card:", index);
			if (index > 0) {
				card.animate(
					{
						transform: `translate(calc(var(--cardWdthMargin) * ${
							index - 1
						}),0)`,
					},
					{
						duration: 1000,
						fill: "forwards",
						easing: "cubic-bezier(0,0.2,0.5,1)",
					}
				);
			}
		});
	};

	let run = () => {
		slideIn();
		runHero();
	};

	// unloading temporary transition image and overlay
	useEffect(() => {
		let image = document.getElementById(`image-${product.id}`);
		let overlay = document.getElementById(`overlay-${product.id}`);

		if (image && overlay) {
			console.log(
				"[PRODUCT_IMAGE useEffect] *remove*  image",
				image,
				"overlay",
				overlay
			);
			setTimeout(() => {
				image.animate(
					{
						top: "0",
						opacity: "0",
					},
					{
						duration: 10,
						fill: "forwards",
					}
				);
				setTimeout(() => {
					console.log("NORA REMOVE");
					overlay.remove();
					image.remove();
				}, 50);
				console.log("NORA FADE OUT");
			}, 700);
		}
	}, [product]);

	return (
		<div className="product_image_container">
			<Image
				fill
				className="shop_item-img-new"
				//src="/butterfly_necklace_1.png"
				src={product.image[0]}
				alt=""
				fetchPriority="high"
				priority
			/>
			<Image
				width={100}
				height={100}
				className="shop_item-img-new"
				src="https://murjan-opti.s3.amazonaws.com/butterfly_necklace_1.png"
				alt="random"
			/>
			<Image
				width={100}
				height={100}
				className="shop_item-img-new"
				src="https://murjan-opti.s3.amazonaws.com/Spiral_pendant_1.png"
				alt="random"
			/>
			<Image
				width={100}
				height={100}
				className="shop_item-img-new"
				src="https://murjan-opti.s3.amazonaws.com/butterfly_necklace_1.png"
				alt="random"
			/>
			<Image
				width={100}
				height={100}
				className="shop_item-img-new"
				src="https://murjan-opti.s3.amazonaws.com/butterfly_ring_1.png"
				alt="random"
			/>
		</div>
	);
};
export default ProductImages;
