import { resendOTP } from "@/app/lib/serverMutationFnc";
import Form from "@/app/components/Forms/Form";
import Modal from "@/app/components/general/modal";

const ResendOTP = ({ searchParams }) => {
	console.log("[RESEND OTP PAGE ]:SEARCHPARAMS ->", searchParams);

	let formWidth = "modal";
	let formHeader = "Resend OTP";

	if (searchParams.otp === undefined) {
		return "";
	}

	return (
		<Modal>
			<Form
				mutationFunction={resendOTP}
				formHeader={formHeader}
				formWidth={formWidth}
				mainFormInputs={[
					{
						type: "email",
						label: "Email",
						name: "email",
						required: true,
					},
				]}
				formButton={[{ type: "submit", style: "fill", value: "Send OTP" }]}
			/>
		</Modal>
	);
};

export default ResendOTP;
