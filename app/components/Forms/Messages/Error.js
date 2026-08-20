import React from "react";

const Error_RComp = ({ error, display }) => {
	console.log("[Error Component]: error:", error.message);

	return (
		<h2 className={`form_error_message ${display} reveal_animation`}>
			<span className="text_slide_animation">{error.message}</span>
		</h2>
	);
};

export default React.memo(Error_RComp);
