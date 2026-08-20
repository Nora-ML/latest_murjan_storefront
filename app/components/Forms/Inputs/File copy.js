const FileInput = ({ styling, info, handleChange, form }) => {
	//console.log("File INPUT info ::", info);
	const { parentForm, type, id, label, name, placeholder, required } = info;

	console.log("File INPUT info ::", required);
	let actualId = id ? id : name;

	const withLabel = () => (
		<label className="label_input" htmlFor={name}>
			{`${label} :`}

			<input
				className="input"
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
	const withOutLabel = () => (
		<input
			className={`input ${styling}`}
			data-parent-form={parentForm}
			type={type}
			id={actualId}
			name={name}
			required={required ? required : false}
			placeholder={placeholder}
			/* file={form[name]} */
			onChange={(e) => handleChange(e)}
		/>
	);

	return label === "noLabel" ? withOutLabel() : withLabel();
};
export default FileInput;
