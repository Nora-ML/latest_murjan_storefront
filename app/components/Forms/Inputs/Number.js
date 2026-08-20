import React from "react";
const NumberInput = ({ info, handleChange, formWidth }) => {
	//console.log("Number INPUT info ::", info);
	const { type, label, name, required, disabled, value } = info;

	return (
		<label
			className={`general_label text_input_label ${formWidth} reveal_animation`}
			htmlFor={name}>
			{`${label}:`}
			<input
				className={`general_input form_input ${formWidth} text_slide_animation`}
				type={type}
				id={name}
				name={name}
				required={required}
				disabled={disabled ? true : false}
				onChange={(e) => handleChange(e)}
				defaultValue={value ? value : ""}
			/>
		</label>
	);
};
export default React.memo(NumberInput);
