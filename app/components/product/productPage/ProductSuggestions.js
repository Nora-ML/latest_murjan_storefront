import Image from "next/image";
import "./ProductSuggestions.css";

const ProductSuggestions = () => {
	return (
		<div className="suggestions_page_container">
			<h4 className="suggestions_page_header">You may also like</h4>
			<div className="suggestion_page_image-wrapper">
				<img
					loading="lazy"
					className="suggestions_page_image"
					src="https://murjan-opti.s3.amazonaws.com/butterfly_necklace_1.png"
					alt="random"
				/>
				<p className="suggestions_page_productname">product name</p>
			</div>
			<div className="suggestion_page_image-wrapper">
				<img
					loading="lazy"
					className="suggestions_page_image"
					src="https://murjan-opti.s3.amazonaws.com/Spiral_pendant_1.png"
					alt="random"
				/>
				<p className="suggestions_page_productname">product name</p>
			</div>
			<div className="suggestion_page_image-wrapper">
				<img
					loading="lazy"
					className="suggestions_page_image"
					src="https://murjan-opti.s3.amazonaws.com/butterfly_necklace_1.png"
					alt="random"
				/>
				<p className="suggestions_page_productname">product name</p>
			</div>
		</div>
	);
};
export default ProductSuggestions;
