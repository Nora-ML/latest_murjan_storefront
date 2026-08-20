"use server";
import { gql } from "@apollo/client";
import { getClient } from "./client";
import { cookies } from "next/headers";

const handleError = (error) => {
	let errMsg = "";
	Object.entries(error).map(([k, v]) => {
		console.log("ERROR -- key:", k, " Value :", v);
		if (k === "message") {
			errMsg = v;
		}
	});
	console.log("[ERROR MESSAGE] :", errMsg);
	return errMsg;
};

const signIn = async (fields, variables) => {
	console.log("[SIGN IN FUNCTION] fields:", fields, "variables:", variables);
	let all = "token";
	const SIGNIN = gql`
		mutation SignIn($email: String!, $password: String!) {
			signIn(email: $email, password: $password) {
				${fields === "all" ? all : fields}
			}
		}
	`;

	try {
		let {
			data: { signIn },
		} = await getClient().mutate({
			mutation: SIGNIN,
			variables: { ...variables },
		});

		console.log("[LOGIN SUCCESSFUL]", signIn);

		cookies().set("session", signIn.token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // One week
		});
		return { response: signIn.token, success: "Welcome !!" };
	} catch (error) {
		let errorMessage = handleError(error);
		throw new Error(errorMessage);
	} finally {
	}
};
const activateAccount = async (fields, variables) => {
	console.log(
		"[ACTIVATE ACCOUNT FUNCTION] fields:",
		fields,
		"variables:",
		variables
	);
	let all = "name id role access email";

	const ACTIVATE_USER = gql`
    	mutation ActivateUser($code: String!) {
    		activateUser(code: $code) {
    			${fields === "all" ? all : fields}
    		}
    	}
    `;
	try {
		let { data } = await getClient().mutate({
			mutation: ACTIVATE_USER,
			variables: { ...variables },
		});
		return {
			response: data.activateUser,
			success:
				"Account Successfuly Activated. You Will be directed to Sign In page",
		};
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const resendOTP = async (fields, variables) => {
	console.log("[RESEND OTP] fields:", fields, "variables:", variables);

	const RESEND_OTP = gql`
		mutation ResendOtp($email: String!) {
			resendOtp(email: $email) {
				message
			}
		}
	`;
	try {
		let { data } = await getClient().mutate({
			mutation: RESEND_OTP,
			variables: { ...variables },
		});
		return {
			response: data.resendOTP,
			success: data.resendOTP.message,
		};
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const signUp = async (fields, variables) => {
	console.log("[SIGN UP FUNCTION] fields:", fields, "variables:", variables);
	let all = "name id role access email";

	const SIGNUP = gql`
		mutation SignUp($name: String!, $email: String!, $password: String!) {
			signUp(name: $name, email: $email, password: $password) {
				${fields === "all" ? all : fields}
			}
		}
	`;

	try {
		let { data } = await getClient().mutate({
			mutation: SIGNUP,
			variables: { ...variables },
		});
		return {
			response: data.signUp,
			success: `An OTP has been sent to ${variables.email} for account activation`,
		};
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};

export { signIn, signUp, handleError, activateAccount, resendOTP };
