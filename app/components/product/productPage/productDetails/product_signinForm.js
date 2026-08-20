import LogInUser from "../../../user/signIn";

const ProductSignIn = ({ expand }) => {
	console.log("[PRODUCT SIGNIN ,expand", expand);

	return (
		<div className={`product_signin_container ${expand}`}>
			<div className="product_signin_details">
				<LogInUser />
			</div>
		</div>
	);
};
export default ProductSignIn;
