//import DropDown from "../dropdown/dropdown.js";

const PersonalizeOrder = ({ expand }) => {
	console.log("[PRODUCT ORDER] ,expand", expand);

	return (
		<div className={`product_order_container ${expand}`}>
			<div className="product_order_details">
				<h3 className="item-name">Choker</h3>
				<h3 className="item-size">size -38</h3>
				<h3 className="item-price">$ 200</h3>
			</div>

			<div className="product_enquiry">
				<h1>Product inquiry form</h1>
			</div>
		</div>
	);
};
export default PersonalizeOrder;
