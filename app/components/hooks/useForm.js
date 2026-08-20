"use client";
import { useState } from "react";

export default function useForm(initialState = {}) {
	console.log("[useForm Hook]");

	const [inputs, setInputs] = useState(initialState);
	/* const { formData, imageData, subForm } = inputs; */
	const [state, setState] = useState({
		loading: false,
		response: false,
		error: false,
		success: "",
	});

	const handleChange = async (e) => {
		console.log("[HANDLE change] : e", e);
		let target = e.target;
		let dataType =
			target === "object" && "getAttribute" in target
				? target.getAttribute("data-type")
				: "";
		let parentForm =
			target === "object" && "getAttribute" in target
				? target.getAttribute("data-parent")
				: "";

		let { name, value, type } = target;

		if (type === "file") {
			let imageDisplay = document.querySelector(".form_preview-img");
			imageDisplay.src = URL.createObjectURL(e.target.files[0]);
		}
		if (type === "number") {
			value = parseInt(value);
		}
		if (dataType === "number") {
			value = handleNumberInput(value);
			console.log("HANDLING NUMBER 2 typeof:", typeof value, "value:", value);
		}
		if (parentForm) {
			//console.log("HANDLING NUMBER 3", typeof value);
			return handleSubForm(parentForm, name, value);
		}
		console.log("END OF HANDLE CHANGE");
		setInputs({ ...inputs, [name]: value });
	};

	const handleNumberInput = (input) => {
		console.log("HANDLENUMBER INPUT input:", input);
		let slices = input.split(",").map((item) => parseInt(item));
		console.log("HANDLENUMBER INPUT slices:", slices);
		return slices;
	};

	const handleSubForm = (parent, name, value) => {
		setInputs({
			...inputs,
			[parent]: { ...inputs[parent], [name]: value },
		});
	};

	const handleSubmit = async (e, mutationFunction) => {
		e.preventDefault();

		let isHidden = e.target[0].type === "hidden" ? e.target[0] : "";
		let hiddenField = isHidden && { [isHidden.name]: isHidden.value };
		setState({ response: false, loading: true, error: false, success: false });
		let aggregatedInput = isHidden ? { ...inputs, ...hiddenField } : inputs;

		console.log("[HANDLE SUBMIT ]- Input::", { ...aggregatedInput });
		console.log("[MUTATION FUNCTION ]- :", mutationFunction);

		mutationFunction("all", { ...aggregatedInput })
			.then((data) => {
				let { success = false, response } = data;
				console.log("[Form fetched response]:: ", response, "success", success);
				setState({
					error: false,
					loading: false,
					response: response,
					success: success,
				});
			})
			.catch((error) => {
				console.log("[Form fetched error]:: ", error);
				setState({ ...state, error: error });
			});
	};

	const resetForm = () => {
		setInputs();
	};

	return { state, handleChange, resetForm, handleSubmit };
}
