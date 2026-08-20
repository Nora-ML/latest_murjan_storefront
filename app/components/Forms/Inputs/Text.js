import React from "react";
const TextInput = ({ info, handleChange, formWidth }) => {
	console.log("[TEXT INPUT] ");
	const {
		datatype,
		parentForm,
		id,
		type,
		label,
		name,
		width,
		required,
		value,
	} = info;

	console.log("[TEXT INPUT] :value:", value);

	let actualId = id ? id : name;

	const withLabel = () => (
		<label
			className={`general_label text_input_label ${formWidth}  reveal_animation`}
			style={{ flexBasis: width }}
			htmlFor={name}>
			{`${label}:`}
			<input
				className={`general_input form_input ${formWidth} text_slide_animation`}
				data-parent={parentForm}
				data-type={datatype}
				type={type}
				id={actualId}
				name={name}
				required={required}
				defaultValue={value ? value : ""}
				onChange={(e) => handleChange(e)}
			/>
		</label>
	);
	return withLabel();
};
export default React.memo(TextInput);
