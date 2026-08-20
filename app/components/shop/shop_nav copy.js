"use client";
import React, { useEffect, useState, useContext } from "react";
import "./shop_nav.css";
import {
	CATEGORIES_NAME_ID,
	COLLECTIONS_NAME_ID,
	TAGS_NAME_ID,
} from "@/app/lib/general_used";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { usePathname, useRouter } from "next/navigation";

const ShopNav = () => {
	console.log("[SHOP_NAV COMPONENT] ");
	const Gems = ["gem0", "gem1", "gem2", "gem3", "gem4", "gem5", "gem6"];
	const [param, setParam] = useState();
	let router = useRouter();

	const { data: { categories } = {} } = useSuspenseQuery(CATEGORIES_NAME_ID);
	const { data: { collections } = {} } = useSuspenseQuery(COLLECTIONS_NAME_ID);

	const [active, setActive] = useState({});
	const [filter, setFilter] = useState({});

	useEffect(() => {
		let filter = document.querySelectorAll(".shop_dropdown-container");

		let deactivate = (e) => {
			let isLeftActive = e.target.className.includes(" activate");

			if (isLeftActive) {
				let type = e.target.firstChild.innerHTML;
				setActive({ [type]: "deactivate" });
				router.push(`/shop${param}`, { scroll: false });
			}
		};

		filter.forEach((filt) => {
			filt.addEventListener("mouseleave", deactivate);
		});

		return () =>
			filter.forEach((filt) => {
				filt.removeEventListener("mouseleave", deactivate);
			});
	}, [active, param]);

	useEffect(() => {
		let stick = (e) => {
			console.log("STICK");
			let filterContainer = document.querySelector(".filter_container");
			let navBar = document.querySelector(".navContainer");
			let isTop = filterContainer?.getBoundingClientRect().top < 50;

			if (isTop) {
				filterContainer.classList.remove("unstick");
				filterContainer.classList.add("stick");
				navBar.classList.add("shrink");
			} else {
				filterContainer?.classList.remove("stick");
				filterContainer?.classList.add("unstick");
				navBar.classList.remove("shrink");
			}
		};

		window.addEventListener("scroll", stick);
		return () => window.removeEventListener("scroll", stick);
	}, []);

	if (!categories || !collections)
		return <p className="loading_Product">Fetching Nav Data ..</p>;

	const activate = (option) => {
		if (active[option]) {
			if (active[option] !== "deactivate") {
				setActive({ [option]: "deactivate" });
			} else {
				setActive({ [option]: "activate" });
			}
		} else {
			let previous = Object.keys(active)[0];
			if (previous) {
				setActive({ [option]: "activate", [previous]: "deactivate" });
			} else {
				setActive({ [option]: "activate" });
			}
		}
	};
	const route = (selection) => {
		let output = Object.entries(selection).map(([k, v], index) => {
			let flatArray = v.toString().replaceAll(",", "+");
			let theKey = index === 0 ? `?${[k]}=` : `&${[k]}=`;
			let thisParam = theKey + flatArray;
			return thisParam;
		});
		setParam(output);
		router.prefetch(`/shop${output}`);
	};
	const addToFilter = (e, type, option) => {
		e.target.classList.toggle("selected");
		let typeHasSelection = filter[type];
		let filterAfterAdj;

		if (typeHasSelection && typeHasSelection[0]) {
			let isPrevSelected = typeHasSelection.filter(
				(selection) => selection === option
			)[0];

			if (isPrevSelected) {
				let arrayWithoutSelection = typeHasSelection.filter(
					(selection) => selection !== option
				);
				if (arrayWithoutSelection.length < 1) {
					delete filter[type];
					filterAfterAdj = { ...filter };
				} else {
					filterAfterAdj = {
						...filter,
						[type]: arrayWithoutSelection,
					};
				}
			} else {
				filterAfterAdj = {
					...filter,
					[type]: [...new Set(filter[type].concat(option))],
				};
			}
		} else {
			filterAfterAdj = { ...filter, [type]: new Array(option) };
		}
		setFilter(filterAfterAdj);
		route(filterAfterAdj);
	};

	//console.log("filter", filter);

	return (
		<div className="shop_filter-wrapper">
			<div
				className={`shop_dropdown-container ${active && active["category"]}`}>
				<p
					className={`shop_dropdown_selected ${active && active["category"]}`}
					onClick={() => activate("category")}>
					category
				</p>
				<ul className={`shop_dropdown_wrapper ${active && active["category"]}`}>
					{categories.map((arr, index) => (
						<li
							key={index}
							onClick={(e) => addToFilter(e, "category", arr.id)}
							className="option">
							{arr.name}
						</li>
					))}
				</ul>
			</div>
			<div
				className={`shop_dropdown-container ${active && active["collection"]}`}>
				<p
					className={`shop_dropdown_selected ${active && active["collection"]}`}
					onClick={() => activate("collection")}>
					collection
				</p>
				<ul
					className={`shop_dropdown_wrapper ${active && active["collection"]}`}>
					{collections.map((arr, index) => (
						<li
							key={index}
							onClick={(e) => addToFilter(e, "collection", arr.id)}
							className="option">
							{arr.name}
						</li>
					))}
				</ul>
			</div>
			<div className={`shop_dropdown-container ${active && active["Gems"]}`}>
				<p
					className={`shop_dropdown_selected ${active && active["Gems"]}`}
					onClick={() => activate("Gems")}>
					Gems
				</p>
				<ul className={`shop_dropdown_wrapper ${active && active["Gems"]}`}>
					{Gems.map((arr, index) => (
						<li
							key={index}
							onClick={() => addToFilter("Gems", arr)}
							className="option">
							{arr}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default ShopNav;
