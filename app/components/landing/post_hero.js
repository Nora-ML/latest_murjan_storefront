import React from "react";
import Image from "next/image";
import "./post_hero.css";

const PostHero = ({ child, about }) => {
	console.log("[POST_HERO] :");

	/* let about = {
		__typename: "PostHero",
		about_second_sub_header: "post header",
		about_header: "CREATING DIAMOND HISTORY",
		about_image: ["/imperial_blue1.jpg", "/Infinity_01.jpg"],
		about_sub_header: "Exceptional Skill, Eternal Beauty ..",
	}; */

	let about_image_fixed = ["/imperial_blue1.jpg", "/Infinity_01.jpg"];
	let { about_header, about_image, about_sub_header, about_second_sub_header } =
		about;

	return (
		<div className="post_hero-container">
			{child && child(data)}

			<svg
				className="separator"
				preserveAspectRatio="xMinYMin meet"
				viewBox="0 0 100 200">
				<path
					className="path-anim"
					d="M-4-1c362 0 1360-1 1653 0v121H-3V83Z"
					data-path-to="M-4-1c-87 208 1360-1 1653 0v121H-3V83Z"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>

			<h1 className="main_posthero_header reveal_animation">
				<span className="text_slide_animation">{about_header}</span>
			</h1>

			<h3 className="sub_posthero_header reveal_animation">
				<span className="text_slide_animation">{about_sub_header}</span>
			</h3>
			<div className="image-main-container">
				{about_image_fixed &&
					about_image_fixed.map((img, index) => (
						<div
							key={(index * 0.153).toString()}
							className={`i-con image-container image-container-${
								index === 0 ? "first" : "second"
							}`}>
							{/* <img className="post_hero_img main_image" src={img} alt="" /> */}
							<Image
								/* layout="fill" */

								fill
								sizes="(max-width: 485px) 122px, (min-width: 1024px) 435px, 20vw"
								className="post_hero_img main_image image_slide_animation"
								src={img}
								alt="Blue Emrald Necklace"
								priority
							/>
						</div>
					))}
			</div>

			<h4 className="sub2_posthero_header">{about_second_sub_header}</h4>
		</div>
	);
};

export default React.memo(PostHero);
