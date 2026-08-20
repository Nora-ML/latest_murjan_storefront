import { activateAccount } from "@/app/lib/serverMutationFnc";
import Form from "@/app/components/Forms/Form";

const ActivateUser = ({ children }) => {
	let formWidth = "narrow";
	let formHeader = "Activation OTP";

	return (
		<>
			{children}
			<Form
				mutationFunction={activateAccount}
				formHeader={formHeader}
				formWidth={formWidth}
				onSuccess={{ navigate: "/user/signin" }}
				mainFormInputs={[
					{
						type: "verification",
						length: 6,
						name: "code",
						placeholder: "0",
						required: true,
					},
				]}
				formButton={[
					/* submit */
					{ type: "submit", style: "fill", value: "Activate Account" },
					{
						type: "text",
						style: "transparent",
						value: "Resend OTP ?",
						action: { navigate: "/user/activation?otp=resend" },
					},
				]}
			/>
		</>
	);
};

export default ActivateUser;
