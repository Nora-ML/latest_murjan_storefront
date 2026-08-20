"use client";
import React, { useEffect } from "react";
import "./category_nav.css";

const CategoryNav = () => {
	console.log("[CATEGORIES] ");

	/* const {
		data: { categories },
	} = await getClient().query({
		query: FEATURED_PRODUCTS,
		variables: { limit: 4 },
	}); */
	let categories = [
		{ id: "123", name: "x" },
		{ id: "456", name: "y" },
		{ id: "789", name: "z" },
	];

	useEffect(() => {
		let timer = null;
		let newDistance = 0;
		let newDistanceHeader = 0;

		const triggerHoriziontalScroll = () => {
			if (categories && categories.length > 1) {
				//console.log("TRIGGER HORIZONTAL SCROLL");
				let landingCategory = document.querySelector(".landing-category");
				let stickyCategory = document.querySelector(
					".landing-category__sticky"
				);
				let header = document.querySelector(".category-headers");
				let { height: headerHeight } = header
					? header.getBoundingClientRect()
					: { height: 0 };
				let { top: mainCateg_top } = landingCategory
					? landingCategory.getBoundingClientRect()
					: { top: 0 };
				let categoryWrapper = document.querySelector(".category-products");
				let headerWrapper = document.querySelector(".header-content");
				let sectionCount;
				let totalHeight = window.innerHeight;
				if (categories) {
					sectionCount = categories.length;
				}
				let { width: categoryWrapper_width, right: categoryWrapperRight } =
					categoryWrapper && categoryWrapper.getBoundingClientRect();
				let { width: headerWrapper_width } =
					headerWrapper && headerWrapper.getBoundingClientRect();
				let eachSectionWidth = categoryWrapper_width / sectionCount;
				let eachHeaderWidth = headerWrapper_width / sectionCount;
				let eachSectionHeight = (totalHeight + headerHeight) / sectionCount;
				let eachHeaderHeight = (totalHeight - headerHeight) / sectionCount;

				let ratio = (categoryWrapper_width - eachSectionWidth) / totalHeight;
				let ratioHeader = (headerWrapper_width - eachHeaderWidth) / totalHeight;

				let runThis = (direction) => {
					//console.log("RUN THIS ");
					let arrayOfStops = [];
					let arrayOfHeaderStops = [];
					for (let i = 1; i <= sectionCount; i++) {
						let diff = Math.floor(i * eachSectionHeight + mainCateg_top);
						arrayOfStops.push(diff);
						let headerdiff = Math.floor(i * eachHeaderHeight + mainCateg_top);
						arrayOfHeaderStops.push(headerdiff);
					}
					//console.log("ARRAY OF STOPS", arrayOfStops);
					let diff = arrayOfStops.findIndex((num) => num > 0);
					let headerdiff = arrayOfHeaderStops.findIndex((num) => num > 0);
					newDistance = -arrayOfStops[diff];
					newDistanceHeader = -arrayOfHeaderStops[headerdiff];
					categoryWrapper.style.transform = `translateX(${
						ratio * (mainCateg_top + newDistance)
					}px)`;
					headerWrapper.style.transform = `translateX(${
						ratioHeader * (mainCateg_top + newDistance)
					}px)`;
				};

				if (mainCateg_top <= 0) {
					/* console.log(
					"FIRST CONDITION, mainCat_top",
					mainCateg_top,
					"categoryData",
					categoryWrapperData
				); */
					if (mainCateg_top >= -totalHeight) {
						//console.log("SECOND CONDITION eachWidth", eachHeaderWidth);
						stickyCategory.style.position = "sticky";

						let value =
							newDistance < 0 ? mainCateg_top + newDistance : mainCateg_top;
						categoryWrapper.style.transform = `translateX(${
							ratio * (value < -3260 ? -3260 : value)
						}px)`;
						headerWrapper.style.transform = `translateX(${
							ratioHeader * value
						}px)`;

						if (timer !== null) {
							clearTimeout(timer);
						}

						timer = setTimeout(() => {
							//console.log("TIMEEEEEEEEEEEEEEEEEEEER");
							runThis();
						}, 1000);
					} else {
						stickyCategory.style.position = "fixed";
					}
				} else {
					//	console.log("FIRST CONDITION, mainCat_top", mainCateg_top);
				}
			}
		};

		window.addEventListener("scroll", triggerHoriziontalScroll);

		return () => window.removeEventListener("scroll", triggerHoriziontalScroll);
	}, [categories]);

	return (
		<>
			<div className="landing-category">
				<div className="landing-category__sticky">
					<div className="category-headers">
						<h1 className="header-fixed">Trending</h1>
						<div className="header-dynamic">
							<div className="header-content">
								{categories &&
									categories.map((cat, index) => (
										<h1 key={cat.id} className="header-content__text">
											{cat.name}
										</h1>
									))}
							</div>
						</div>
					</div>
					<div className="category-products">
						{categories &&
							categories.map((cat, index) => (
								<div key={cat.id + "" + index} className="each-category">
									<div className="each-category__product-card">
										{cat.products.map((prod, index) => (
											<div key={prod.id + "" + index} className="product-image">
												<img
													className="featured_images"
													src={prod.image[0]}
													//layout="fill"
													//objectFit="cover"
													//src={arrayImages[Math.floor(Math.random() * 6)]}
													alt=""
												/>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};
export default CategoryNav;
