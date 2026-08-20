import LogInUser from "@/app/components/user/signIn";

const SignIn = () => {
	console.log("[SIGNIN PAGE]");

	return (
		<div className="form_wrapper_user">
			<LogInUser />
		</div>
	);
};
export default SignIn;
