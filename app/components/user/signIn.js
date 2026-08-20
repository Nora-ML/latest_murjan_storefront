import { signIn } from "@/app/lib/serverMutationFnc";
import Form from "@/app/components/Forms/Form";

const LogInUser = () => {
	console.log("[SIGNIN COMPONENT]");

	let formWidth = "narrow";
	let formHeader = "Sign In";

	return (
		<Form
			formWidth={formWidth}
			onSuccess={{ navigate: "/shop" }}
			formHeader={formHeader}
			mutationFunction={signIn}
			mainFormInputs={[
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
				{ type: "submit", style: "fill", value: "Sign In" },
				{
					type: "text",
					style: "transparent",
					value: "New User?",
					action: { navigate: "/signup" },
				},
			]}
		/>
	);
};
export default LogInUser;
