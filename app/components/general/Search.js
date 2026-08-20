"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./search.css";

const Search = ({ className }) => {
	console.log("[SEARCH COMPONENT]");

	const path = usePathname();
	const router = useRouter();

	const [selection, setSelection] = useState({
		term: "firstshot",
		type: "all",
	});

	const { term, type } = selection;

	const debounce = (fn, time) => {
		let timeOut;

		return (...args) => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				fn(...args);
			}, time);
		};
	};

	const searchProcess = (t, ty) => {
		if (path.includes("admin")) {
			console.log("Pushing query in url admin", t, "-", ty);
			router.push({
				pathname: `${path}`,
				query: `type=${ty}&term=${t}`,
			});
		} else {
			router.push({
				pathname: `/filter`,
				query: `type=${ty}&term=${t}`,
			});
		}
	};

	const handleChangeProcess = (e) => {
		console.log("HAndling term Change");
		const { value, name } = e.target;
		console.log("path ", path);
		setSelection({ ...selection, [name]: value });
	};

	const search = debounce(searchProcess, 500);
	const handleChange = debounce(handleChangeProcess, 500);

	useEffect(() => {
		console.log("SEARCh useseffect");
		if (path.includes("admin")) {
			let typeS = path.split("/admin/")[1];
			console.log("HAndling type Change in ADMIN mode type,:", typeS);
			setSelection({ ...selection, type: typeS });
		}

		if (term !== "firstshot" && type) {
			console.log("FIIIIIIIIIIIIRE SEARCH", term, type);
			search(term, type);
		}
	}, [path, term]);

	return (
		<div className={`search_wrap ${className}`}>
			{!path.includes("admin") ? (
				<div className="search_icon">
					<label className="input_label" forHTML="term">
						<input
							className="input_field"
							onChange={handleChange}
							type="text"
							name="term"
							id="term"
						/>
					</label>
					<label className="input_label" forHTML="type">
						<select onChange={handleChange} name="type" id="type">
							<option value="all">All</option>
							<option value="products">Products</option>
							<option value="tags">Tags</option>
							<option value="collections">Collections</option>
							<option value="categories">Categories</option>
						</select>
					</label>
				</div>
			) : (
				<>
					<input
						className="input_field_search"
						onChange={handleChange}
						type="text"
						name="term"
						id="term"
					/>
					<img
						className="icon_image"
						src="https://cdn-icons-png.flaticon.com/512/158/158740.png"
						alt="Search icon"
					/>
				</>
			)}
		</div>
	);
};
export default Search;
