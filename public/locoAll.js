console.log("SCRIPT ADDED");
let bodyTag = document.querySelector("body");

let currentScroll = 0;
let aimScroll = 0;
let main_speed = 0.05;
let jumpStart = "no";

const changeScroll = () => {
	console.log("CHANGE SCROLL");
	let screenHeight = window.innerHeight;
	const main = document.querySelector(".main_layout-container");
	let productPage = document.querySelector(".product_page_container");
	let triggerFooter = screenHeight * 1.5;
	if (main && !productPage) {
		bodyTag.style.height = main.offsetHeight + "px";
		currentScroll = Math.ceil(
			currentScroll + (aimScroll - currentScroll) * main_speed
		);
		main.style.top = -1 * currentScroll + "px";

		if (currentScroll !== window.scrollY && jumpStart === "no") {
			requestAnimationFrame(changeScroll);
		} else {
			//console.log("JUMP STARTING in CHANGESCROLL");
			jumpStart = "yes";
		}
	}

	/* 	if (productPage) {
		console.log("PRODUCT PAGE Scroll");
		bodyTag.style.height = productPage.offsetHeight + "px";
		currentScroll = Math.ceil(
			currentScroll + (aimScroll - currentScroll) * main_speed
		);
		productPage.style.top = -1 * currentScroll + "px";

		if (currentScroll !== window.scrollY && jumpStart === "no") {
			requestAnimationFrame(changeScroll);
		} else {
			//console.log("JUMP STARTING in CHANGESCROLL");
			jumpStart = "yes";
		}
	} */

	let footer = document.querySelector(".footer_container");
	if (footer) {
		let mainBottom = main.getBoundingClientRect().bottom;
		if (mainBottom <= triggerFooter) {
			let diff = triggerFooter - mainBottom;
			console.log("TRIGGER FOOTER:", diff * -1 * main_speed);
			footer.style.bottom = `translateY(${diff * main_speed}px)`;
		} else {
			footer.style.bottom = "-50%";
		}
	}
	let postHeroContainer = document.querySelector(".post_hero-container");
	const mainImage = document.querySelectorAll(".main_image");
	if (postHeroContainer && mainImage) {
		let postHeroData = postHeroContainer.getBoundingClientRect();
		let postHeroHeight = postHeroData.height;
		let postHeroTop = postHeroData.top;
		let inView = postHeroHeight / 4; // half of container in view
		let triggerPoint = screenHeight - 140;

		// start anim
		if (postHeroTop <= triggerPoint) {
			console.log("TRIGGER POST HERO");
			postHeroContainer.classList.add("trigger_postHero_anim");
		}

		console.log("POST HERO DATA");
		// end anim
		//scrollspeed
		mainImage.forEach((image) => {
			const image_box = image.getBoundingClientRect();
			const top_quart = image_box.y + image_box.height / 4;
			const diff = top_quart - screenHeight / 4;

			const speed = 0.2;
			image.style.top = (0 - diff) * speed + "px";
		});
	}
	let filterContainer = document.querySelector(".shop_hero_container");
	if (filterContainer) {
		let filterWrapper = document.querySelector(".shop_filter-wrapper");
		let shopDropDown = document.querySelectorAll(".shop_dropdown_selected");
		let isTop = Math.floor(filterContainer?.getBoundingClientRect().top);
		let screenH = Math.floor(screenHeight * -0.88);
		let isAnimated = filterWrapper.classList.contains("filter_stuck");

		if (isTop === screenH && !isAnimated) {
			console.log("STICK");
			filterWrapper.classList.add("filter_stuck");
			filterWrapper.animate(
				{
					justifyContent: "center",
				},
				{ duration: 500, fill: "forwards", easing: "ease" }
			);
			shopDropDown.forEach((shop) => {
				shop.animate(
					{
						textAlign: "center",
					},
					{ duration: 500, fill: "forwards", easing: "ease" }
				);
			});
		}
		if (isTop < screenH || (isTop > screenH && isAnimated)) {
			console.log("UN-STICK");
			filterWrapper.classList.remove("filter_stuck");
			filterWrapper.animate(
				{
					justifyContent: "flex-start",
				},
				{ duration: 500, fill: "forwards", easing: "ease" }
			);
			shopDropDown.forEach((shop) => {
				shop.animate(
					{
						textAlign: "left",
					},
					{ duration: 500, fill: "forwards", easing: "ease" }
				);
			});
		}
	}
	let targets = document.querySelectorAll(".shop_item");
	if (targets) {
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
			threshold: 0.5,
		};

		let observer = new IntersectionObserver(callback, options);

		targets.forEach((target) => {
			observer.observe(target);
		});
	}
};

window.addEventListener(
	"scroll",
	() => {
		aimScroll = window.scrollY;
		console.log("SCROLLLING");
		if (jumpStart === "yes") {
			jumpStart = "no";
			currentScroll = currentScroll + 1;
			changeScroll();
		}
	},
	{ passive: true }
);

setTimeout(() => {
	changeScroll();
}, 100);
