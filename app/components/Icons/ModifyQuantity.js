export const Decrease = ({ func }) => {
	console.log("[DECREASE ICON] func:", func);
	return (
		<img
			className="modifyquantity_icon"
			src="./minus.png"
			alt=""
			onClick={func}
		/>
	);
};
export const Increase = ({ func }) => {
	console.log("[INCREASE ICON] func:", func);
	return (
		<img
			className="modifyquantity_icon"
			src="./plus.png"
			alt=""
			onClick={func}
		/>
	);
};

export default { Decrease, Increase };
