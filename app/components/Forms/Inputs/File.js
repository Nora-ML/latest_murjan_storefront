const FileInput = ({ styling, info, handleChange, formWidth }) => {
	//console.log("File INPUT info ::", info);
	const { parentForm, type, id, label, name, placeholder, required, value } =
		info;

	console.log("[File INPUT] value:", value);
	let actualId = id ? id : name;

	const withLabel = () => (
		<label
			className={`general_label file_input_label ${formWidth}  reveal_animation`}
			htmlFor={name}>
			<div className="form_preview-img-wrap">
				<img className="form_preview-img" alt="" src={value ? value : "#"} />
			</div>

			<input
				className="file_input"
				data-parent-form={parentForm}
				type={type}
				id={actualId}
				name={name}
				required={required}
				placeholder={placeholder}
				/* file={form[name]} */
				onChange={(e) => handleChange(e)}
			/>
		</label>
	);

	return label === "noLabel" ? withOutLabel() : withLabel();
};
export default FileInput;
