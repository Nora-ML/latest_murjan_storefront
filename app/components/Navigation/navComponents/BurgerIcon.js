const BurgerIcon = ({ burgerState, setBurgerState }) => {
	return (
		<div
			className={`burger-icon burger-icon ${burgerState ? "active" : ""}`}
			onClick={() => setBurgerState(!burgerState)}>
			<span className="line line1"></span>
			<span className="line line2"></span>
			<span className="line line3"></span>
		</div>
	);
};

export default BurgerIcon;
