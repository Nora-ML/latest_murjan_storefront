console.log("SCRIPT ADDED");
let bodyTag = document.querySelector("body");
const main = document.querySelector(".main_container");

// footer
const footer = document.querySelector(".content-2");
const footer_top = footer?.getBoundingClientRect().top;

//const figcaptions = document.querySelectorAll("figcaption");
const mainImage = document.querySelectorAll(".main_image");
const decoImage = document.querySelectorAll(".decoration_image");

const motion = window.matchMedia("(prefers-reduced-motion:no-preference");
//const large = window.matchMedia("(min-width:600px");

if (motion.matches /* & large.matches */ && main) {
	let currentScroll = 0;
	let aimScroll = 0;
	let main_speed = 0.04;

	let timer = 1;
	let jumpStart = "no";
	const changeScroll = () => {
		console.log("CHANGE SCROLL");
		bodyTag.style.height = main.offsetHeight + "px";

		currentScroll = Math.ceil(
			currentScroll + (aimScroll - currentScroll) * main_speed
		);
		main.style.top = -1 * currentScroll + "px";

		mainImage.forEach((image) => {
			const image_box = image.getBoundingClientRect();
			const top_quart = image_box.y + image_box.height / 4;
			const diff = top_quart - window.innerHeight / 4;

			const speed = 0.2;
			image.style.top = (0 - diff) * speed + "px";
		});
		decoImage.forEach((image) => {
			//console.log("image in loco.js", image);

			const image_box = image.getBoundingClientRect();
			const top_quart = image_box.y + image_box.height / 4;
			const diff = top_quart - window.innerHeight / 4;

			const speed = 0.4;
			image.style.top = (0 - diff) * speed + "px";
		});
		if (
			currentScroll === 0 ||
			(currentScroll !== window.scrollY && jumpStart === "no")
		) {
			requestAnimationFrame(changeScroll);
		} else {
			//console.log("JUMP STARTING in CHANGESCROLL");
			jumpStart = "yes";
		}
	};

	window.addEventListener("scroll", () => {
		//console.log("SCRolling");
		aimScroll = window.scrollY;
		if (jumpStart === "yes") {
			//console.log("JUMP STARTING in SCROLLING");
			jumpStart = "no";
			currentScroll = currentScroll + 1;
			changeScroll();
		}
	});

	if (timer !== "done") {
		setTimeout(() => {
			//console.log("IN TIMER ");
			changeScroll();
			timer = "done";
		}, 500);
	}
}
