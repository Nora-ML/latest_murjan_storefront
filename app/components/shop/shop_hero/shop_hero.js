"use client";
import { useContext } from "react";
import { FilterContext } from "../../context/filterContext";

const ShopHero = () => {
	console.log("[ SHOP-HERO ] ");
	let { filter } = useContext(FilterContext);

	return (
		<div className="shop_hero-wrapper">
			<h4 className="shop_subheader hero_animation">
				<span className="shop_text-reveal">Products</span>
			</h4>
			<h1 className="shop_header hero_animation">
				{filter.category ? (
					filter.category.map((category, index) => {
						let origFont = 7.5;
						("vw");
						let len = filter.category.length;
						let font = origFont - len / 1.5;
						return (
							<>
								<span
									key={category + index}
									className="shop_text-reveal"
									style={{
										fontSize: font + "vw",
										textTransform: "capitalize",
										fontStyle: "italic",
									}}>
									{category}
								</span>
								{len > 1 && index !== len - 1 ? (
									<span
										style={{
											fontSize: font + "vw",
											textTransform: "capitalize",
											fontStyle: "italic",
										}}
										className="shop_text-reveal">
										,&nbsp;
									</span>
								) : (
									""
								)}
							</>
						);
					})
				) : (
					<span className="shop_text-reveal">All Products</span>
				)}
			</h1>
			<h4 className="shop_subheader hero_animation shop_post_header">
				<span className="shop_text-reveal"></span>
				{filter.collection && (
					<span className="shop_text-reveal"> Collections :</span>
				)}
				{filter.collection ? (
					filter.collection.map((collection, index) => {
						return (
							<span
								key={collection + index}
								className="shop_text-reveal"
								style={{
									/* fontSize: font + "vw", */
									textTransform: "capitalize",

									opacity: 0.8,
								}}>
								{index > 0 ? `, ${collection}` : collection}
							</span>
						);
					})
				) : (
					<span className="shop_text-reveal">All Collections</span>
				)}
			</h4>
		</div>
	);
};
export default ShopHero;
