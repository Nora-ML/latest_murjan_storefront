const DropDown = ({ info, handleChange, formWidth }) => {
	const {
		label,
		name,
		data,
		multiple,
		additionalText,
		required,
		value,
		width,
	} = info;
	console.log("[DropDown] data:", data, "\nname:", name, "\nvalue:", value);

	let optionArray = data && data.length > 0 ? data[0].split(",") : false;
	let notTypeName = name && name[0] !== "__typename" ? name : false;

	console.log("OPTIONARRAY", optionArray, "length", optionArray.length);
	return (
		<>
			{optionArray && notTypeName ? (
				<label
					className={`general_label dropdown_input_label ${formWidth}  reveal_animation`}
					style={{
						flexBasis: width,
					}}
					htmlFor={name}>
					{`${label ? label + ":" : ""}`}

					<select
						className={`general_input dropdown_input ${formWidth}`}
						onChange={(e) => handleChange(e)}
						name={name}
						required={required === "true"}
						multiple={multiple === "true"}
						id={name}>
						{multiple !== "true" && (
							<option
								className="dropdown-option"
								defaultValue={value ? value.id : "none"}
								selected
								disabled
								hidden>
								{value ? value.name : optionArray["0"]}
							</option>
						)}
						{optionArray.length > 1 &&
							optionArray.map((option, index) => {
								console.log("[DROPDOWN OPTION] :", option);
								return (
									<option
										className="dropdown-option"
										key={option + index}
										disabled={optionArray.length === 1 ? true : false}
										/* selected={form[name] === obj["id"] ? true : false}
						value={obj["id"]} */
									>
										{option.name ? option.name : option}
									</option>
								);
							})}
					</select>
					{additionalText ? (
						<p className="add_remarks">{additionalText}</p>
					) : (
						""
					)}
				</label>
			) : (
				""
			)}
		</>
	);
};
export default DropDown;
