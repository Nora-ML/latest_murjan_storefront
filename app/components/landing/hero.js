import { getLanding } from "@/app/lib/serverQueryFnc";
import "./hero.css";

const Hero = async () => {
	console.log("[HERO] ");

	/* let hero = {
		__typename: "Hero",
		hero_media: ["https://murjan-opti.s3.amazonaws.com/Murjan_compress.mp4"],
		hero_header: "la Cama en Dormitorio",
		hero_sub_header: "Sara es mi novia",
	}; */
	const { hero } = await getLanding();
	let { hero_header, hero_media, hero_sub_header } = hero;

	return (
		<div className="hero_container">
			<video
				priority
				id="video"
				src={hero_media}
				type="video/mp4"
				className="hero_video"
				/* width={1030} */
				autoPlay
				/* loop */
				muted
			/>

			{/* {child && child} */}
		</div>
	);
};
export default Hero;
