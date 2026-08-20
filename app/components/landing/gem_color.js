"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import "./gem_color.css";

const GemColor = ({ child, gem }) => {
	console.log("[GEM_COLOR] :");

	const [state, setState] = useState(0);
	/* let gem = [
		{
			__typename: "SlideDisplay",
			parallelS_main_media: [Object],
			parallelS_secondary_media: [Object],
			parallelS_description: "Shop Emeralds",
			slide_id: 0,
		},
		{
			__typename: "SlideDisplay",
			parallelS_main_media: [Object],
			parallelS_secondary_media: [Object],
			parallelS_description: "Shop Yellow Stone",
			slide_id: 1,
		},
		{
			__typename: "SlideDisplay",
			parallelS_main_media: [Object],
			parallelS_secondary_media: [Object],
			parallelS_description: "Shop Sapphire",
			slide_id: 2,
		},
	]; */
	const activate = (direction) => {
		if (direction === "next") {
			if (state <= gem.length - 2) {
				setState(state + 1);
			} else {
				setState(0);
			}
		}
		if (direction === "prev") {
			if (state > 0) {
				setState(state - 1);
			} else {
				setState(gem.length - 1);
			}
		}
	};

	return (
		<div className="parallel-slide-container">
			{gem.map((slide, index) => {
				let {
					slide_id,
					parallelS_main_media,
					parallelS_secondary_media,
					parallelS_description,
				} = slide;

				return (
					<div
						key={`${index + parallelS_description}`}
						className={`slide-contents ${index === state ? "active" : ""}`}>
						<div
							className="slide-main-media"
							style={index === state ? { zIndex: 2 } : { zIndex: 1 }}>
							<video
								className="slide_video"
								type="video/mp4"
								src={parallelS_main_media["desktop"]}
								title={parallelS_main_media["alt"]}
								autoPlay
								loop
								muted
							/>
							{child && child(slide)}
						</div>

						<div className="slide-secondary-media">
							<div className="slide-image-container">
								<Image
									height={100}
									width={100}
									className="slide_image"
									src={parallelS_secondary_media["desktop"]}
									alt={parallelS_secondary_media["alt"]}
								/>
							</div>
							<div className="slide_action">
								<h1>{`${parallelS_description}`}</h1>
							</div>
						</div>
					</div>
				);
			})}
			<div onClick={() => activate("prev")} className="btn prev"></div>
			{/* <div className="progress">
				{[...new Array(gem.length)].map((r, index) => (
					<div key={index + ""}>
						<img
							className={`progress_dot ${index === state ? "active" : ""}`}
							src={dot2}
							alt="progress dot"
						/>
					</div>
				))}
			</div> */}
			<div onClick={() => activate("next")} className="btn next"></div>
		</div>
	);
};

export default GemColor;
