"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "@/app/lib/users_used";
// sub components
import Form from "../Forms/Form";
import "./addPage.css";

const AddUser = () => {
	const [activationMailToUser, { loading, error, data }] = useMutation(SIGNUP);
	const [counter, setCounter] = useState(0);

	const activate = () => {
		if (counter === 0 || counter === 1) {
			setCounter(2);
		} else {
			setCounter(1);
		}
	};

	return (
		<div
			className={
				!counter
					? "add_page_wrapper initialPage"
					: counter === 2
					? "add_page_wrapper openPage"
					: "add_page_wrapper closePage"
			}>
			<div className="trigger" onClick={activate}>
				<h1>{counter === 2 ? "x" : "+"}</h1>
			</div>

			<Form
				successMsg={`An activation Link has been sent to your email.`}
				formWidth="70%"
				formHeader="New User"
				mutationFunction={activationMailToUser}
				/* Form Characteristics :  [fieldtype,typeof,labelText,name/id/for,placeholder,required,Attr2,Attr3] */
				mainFormInputs={[
					{
						type: "text",
						label: "Name",
						name: "name",
						placeholder: "Name..",
						required: "true",
					},
					{
						type: "email",
						label: "Email",
						name: "email",
						placeholder: "Email..",
						required: "true",
					},
					{
						type: "password",
						label: "Password",
						name: "password",
						placeholder: "Password ",
						required: "true",
					},
				]}
				formButton={[{ type: "submit", value: "Create User" }]}
			/>
		</div>
	);
};
export default AddUser;
