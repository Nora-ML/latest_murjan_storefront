import React from "react";
const Loading = ({ display, message }) => {
	console.log("[Loading COMPONENT] message:");

	return (
		<div className={`message_wrapper ${display}`}>
			<span className="message loading_message"></span>
		</div>
	);
};

export default React.memo(Loading);
