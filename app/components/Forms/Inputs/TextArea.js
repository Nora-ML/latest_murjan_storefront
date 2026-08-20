const TextArea = ({ info, handleChange, formWidth }) => {
	//console.log("TEXTAREA info ::", info);
	const { type, label, name, placeholder, required, value } = info;

	return (
		<label
			className={`general_label textarea_input_label ${formWidth}  reveal_animation`}
			htmlFor={name}>
			{`${label} :`}

			<textarea
				className="general_input textarea_input"
				id={name}
				name={name}
				required={required}
				cols="40"
				rows="5"
				placeholder={placeholder}
				onChange={(e) => handleChange(e)}
				defaultValue={value ? value : ""}
			/>
		</label>
	);
};
export default TextArea;
