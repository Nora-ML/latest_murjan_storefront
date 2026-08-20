"use client";

import React, { useEffect, useRef, useState } from "react";
//animation
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./pre_loader.css";

gsap.registerPlugin(ScrollTrigger);

const PreLoader = ({ display }) => {
	console.log("[PRE-LOADER] display : ", display);

	const [state, setState] = useState("display");

	const text = "Murjan";
	const array = [];

	for (let i = 0; i < text.length; i++) {
		if (text[i] === " ") {
			array.push("&nbsp;");
		} else {
			array.push([text[i]]);
		}
	}

	useEffect(() => {
		console.log("PRELOADER USEEFFECT");
		if (display) {
			console.log("PRELOADER USEEFFECT change");
			setTimeout(() => {
				setState("hide");
			}, 500);
		}
	}, [display]);
	return (
		<div className={`preloader_text-container ${"preloader_" + state}`}>
			<h1 className={`text reveal_animation ${"preloader_text_" + state}`}>
				{array.map((item, i) => (
					<span
						key={`letter${i}`}
						style={{ animationDelay: `${i / 10}s` }}
						className="text_slide_animation">
						{item}
					</span>
				))}
			</h1>
			<span
				className={`preloader_slide preloader_slide2 ${
					"preloader_" + state
				}`}></span>
			<span
				className={`preloader_slide preloader_slide3 ${
					"preloader_" + state
				}`}></span>
		</div>
	);
};
export default PreLoader;
