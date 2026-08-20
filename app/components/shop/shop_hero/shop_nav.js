"use client";
import { useEffect, useState, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterContext } from "../../context/filterContext";
import "./shop_nav.css";

const ShopNav = ({ categories, collections }) => {
	console.log("[SHOP_NAV COMPONENT] ");
	const [param, setParam] = useState();
	let router = useRouter();

	const { filter, setFilter } = useContext(FilterContext);
	const [active, setActive] = useState({});

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
	}, [param]);

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
	};

	const addToFilter = (e, type, ID) => {
		e.target.classList.toggle("selected");
		let typeHasSelection = filter[type];
		let filterAfterAdj;

		if (typeHasSelection && typeHasSelection[0]) {
			let isPrevSelected = typeHasSelection.filter(
				(selection) => selection === ID
			)[0];

			if (isPrevSelected) {
				let arrayWithoutSelection = typeHasSelection.filter(
					(selection) => selection !== ID
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
					[type]: [...new Set(filter[type].concat(ID))],
				};
			}
		} else {
			filterAfterAdj = { ...filter, [type]: new Array(ID) };
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
			{/* <div className={`shop_dropdown-container ${active && active["Gems"]}`}>
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
			</div> */}
		</div>
	);
};
export default ShopNav;
