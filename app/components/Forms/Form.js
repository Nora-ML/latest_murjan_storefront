"use client";
import React from "react";
import { useEffect, useState } from "react";
// Custom Hook
import useForm from "../hooks/useForm.js";
// Inputs
import TextInput from "./Inputs/Text.js";
import NumberInput from "./Inputs/Number.js";
import FileInput from "./Inputs/File.js";
import DropDown from "./Inputs/Dropdown.js";
import TextArea from "./Inputs/TextArea.js";
import OTPInput from "./Inputs/OTP.js";
import Button from "./Inputs/Button.js";
// Components
import Error_RComp from "./Messages/Error.js";
import Success_RComp from "./Messages/Success.js";
import Loading from "./Messages/loading.js";
//styles

import "./form.css";
import "./Inputs/inputs.css";
import "./Messages/messages.css";

//To-Doozz:
// 1- check why the resetForm is not reseting
// 2- form resets only if loading returns an html

const Form = ({
	formWidth,
	formFields,
	successMsg,
	mainFormInputs,
	subFormInputs,
	formButton,
	mutationFunction,
	formHeader,
	mutationResponse,
	btnCount,
	classN,
	eitherOrRelation,
	onSuccess,
}) => {
	console.log("[FORM COMPONENT]");

	const { state, handleChange, resetForm, handleSubmit } = useForm();
	let { loading, error, response, success } = state;

	/* if (loading)
		return (
			<div style={{ height: "100vh", backgroundColor: "red", width: "100%" }}>
				<h2>LOADING IN FORM COMPONENT</h2>
			</div>
		); */

	console.log("[FORM COMPONENT] state:", state);

	let inputs = {};

	return (
		<form
			className={`main_form ${formWidth}`}
			onSubmit={(e) => handleSubmit(e, mutationFunction)}>
			{formHeader !== "none" && (
				<h1 className="form_header reveal_animation">
					<span className="header_innertext text_slide_animation">
						{formHeader}
					</span>
				</h1>
			)}
			<Loading display={loading ? "display" : "hide"} />
			<Success_RComp
				message={success}
				onSuccess={onSuccess} // further action on success
				display={response && success ? "display" : "hide"}
			/>
			<Error_RComp error={error} display={error ? "display" : "hide"} />
			{mainFormInputs && (
				<div className={`main_form_section ${formWidth}`}>
					{mainFormInputs?.map((input) => {
						return input.type === "hidden" ? (
							<input type="hidden" value={input.value} name={input.name} />
						) : input.type === "number" ? (
							<NumberInput
								info={input}
								handleChange={handleChange}
								formWidth={formWidth}
							/>
						) : input.type === "file" ? (
							<FileInput
								info={input}
								handleChange={handleChange}
								formWidth={formWidth}
							/>
						) : input.type === "textarea" ? (
							<TextArea
								info={input}
								handleChange={handleChange}
								formWidth={formWidth}
							/>
						) : input.type === "dropdown" ? (
							<DropDown
								info={input}
								handleChange={handleChange}
								formWidth={formWidth}
							/>
						) : input.type === "verification" ? (
							<OTPInput
								info={input}
								handleChange={handleChange}
								form={inputs}
							/>
						) : (
							<TextInput
								info={input}
								handleChange={handleChange}
								formWidth={formWidth}
							/>
						);
					})}
				</div>
			)}
			{subFormInputs && (
				<div className={`subform_section ${formWidth}`}>
					{subFormInputs.map((input, index) => (
						<TextInput
							key={index}
							formWidth={formWidth}
							info={input}
							handleChange={handleChange}
						/>
					))}
				</div>
			)}
			{formButton && (
				<div className={`button_form ${formWidth}`}>
					{formButton.map((btn, index) => {
						if (btn !== undefined) {
							return (
								<Button
									key={index}
									info={btn}
									formWidth={formWidth}
									/* buttonTriggeredFunction={buttonTriggeredFunction} */
								/>
							);
						}
					})}
					{/* <input type="reset" value="reset" onClick={() => resetForm()} /> */}
				</div>
			)}
		</form>
	);
};
export default React.memo(Form);
