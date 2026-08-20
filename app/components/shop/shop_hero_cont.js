"use client";
import ShopHero from "./shop_hero/shop_hero";
import ShopNav from "./shop_hero/shop_nav";
import FilterContextProvider from "../context/filterContext";
import { Suspense } from "react";

const ShopHeroCont = ({ categories, collections }) => {
	return (
		<FilterContextProvider>
			<div className="shop_hero_container">
				<ShopHero />
				<Suspense>
					<ShopNav categories={categories} collections={collections} />
				</Suspense>
			</div>
		</FilterContextProvider>
	);
};

export default ShopHeroCont;
