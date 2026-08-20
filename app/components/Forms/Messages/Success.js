import React from "react";
import { useRouter } from "next/navigation";

const Success_RComp = ({ message, onSuccess, display }) => {
	console.log(
		"[SUCCESS COMPONENT] message:",
		message,
		"display:",
		display,
		"onSuccess",
		onSuccess
	);

	let router = useRouter();

	if (display === "display" && onSuccess.navigate) {
		setTimeout(() => {
			console.log("NAVIGATING TO SHOP", onSuccess.navigate);
			router.push(onSuccess.navigate);
		}, 1000);
	}

	return (
		<div className={`message_wrapper ${display}`}>
			<h2 className="message success_message">{message}</h2>
		</div>
	);
};

export default React.memo(Success_RComp);
