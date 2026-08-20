import React from "react";
// Accepts:
// [style] specification fill, border, transparent
// [width] to fit different use cases , (there should be a default width depending on theForm setting itself("wide","long"))

import { useRouter } from "next/navigation";

const Button = ({ info, formWidth }) => {
	console.log("[ INPUT ] : Button", info.value);
	const { value, action, width, style, type } = info;
	const router = useRouter();

	const runClickAction = () => {
		if (action.navigate) {
			router.push(action.navigate);
		}
		if (action.alterState) {
			action.alterState();
		}
	};

	return (
		<input
			className={`button button-${style} ${formWidth} `}
			style={{ flexBasis: width }}
			type={type}
			value={value}
			onClick={action && runClickAction}
		/>
	);
};
export default React.memo(Button);
