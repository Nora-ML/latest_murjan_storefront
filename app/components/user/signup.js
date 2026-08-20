import { signUp } from "@/app/lib/serverMutationFnc";
import Form from "@/app/components/Forms/Form";

const SignUp = () => {
	console.log("[ADD USER]");

	let formWidth = "narrow";
	let formHeader = "Sign Up";

	return (
		<Form
			formWidth={formWidth}
			formHeader={formHeader}
			mutationFunction={signUp}
			onSuccess={{ navigate: "/user/activation" }}
			mainFormInputs={[
				{
					type: "text",
					label: "Name",
					name: "name",
					required: true,
				},
				{
					type: "email",
					label: "Email",
					name: "email",
					required: true,
				},
				{
					type: "password",
					label: "Password",
					name: "password",
					required: true,
				},
			]}
			formButton={[
				/* submit */
				{
					type: "submit",
					value: "Create An Account",
					width: "100%",
					style: "fill",
				},
			]}
		/>
	);
};
export default SignUp;
