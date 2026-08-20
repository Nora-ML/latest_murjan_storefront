"use client";
import { useState } from "react";

const OTPInput = ({ info, handleChange }) => {
	console.log("[OTP INPUT] ");
	const { type, length, name, placeholder, required } = info;

	let [otp] = useState([...new Array(length)]);

	let handleOTP = (e, index) => {
		console.log("HANDLE OTP ", e);

		let value = e.target.value;
		otp.splice(index, 1, value);

		let sibling = e.target.nextSibling;

		if (sibling) {
			sibling.focus();
		}

		let data = { target: { value: otp.join(""), name: name } };
		handleChange(data);
	};

	return (
		<div className="otp_wrapper">
			{[...new Array(length)].map((i, index) => {
				return (
					<input
						key={index}
						className="input verification_input"
						type={type}
						required={required}
						min="0"
						max="9"
						maxlength="1"
						placeholder={placeholder}
						onChange={(e) => handleOTP(e, index)}
					/>
				);
			})}
		</div>
	);
};
export default OTPInput;
