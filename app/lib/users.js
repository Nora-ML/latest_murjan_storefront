import { gql } from "@apollo/client";

/* 
	resetPassMail(email: String, password: String): User
	logInUser(email: String, password: String): User */
// Define mutation

const ACTIVATE_USER = gql`
	mutation ActivateUser($code: String!) {
		activateUser(code: $code) {
			id
			name
		}
	}
`;

const RESETPASS_MAIL_USER = gql`
	mutation RestePassMail($email: String!, $password: String!) {
		resetPassMail(email: $email, password: $password) {
			email
		}
	}
`;
const NEW_PASS_USER = gql`
	mutation newPass($token: String!, $password: String!) {
		newPass(token: $token, password: $password) {
			email
		}
	}
`;
const RESEND_OTP = gql`
	mutation ResendOtp($email: String!) {
		resendOtp(email: $email) {
			message
		}
	}
`;
const CURRENT_USER = gql`
	query CurrentUser {
		currentUser {
			name
			email
			role
			id
			access
		}
	}
`;
const AUTH_USER = gql`
	query AuthenticateUser {
		authenticateUser {
			name
			email
			role
			id
			access
		}
	}
`;
const AUTH_ADMIN = gql`
	query AuthenticateAdmin {
		authenticateAdmin {
			name
			email
			role
			id
			access
		}
	}
`;

export {
	ACTIVATE_USER,
	RESEND_OTP,
	RESETPASS_MAIL_USER,
	NEW_PASS_USER,
	CURRENT_USER,
	AUTH_USER,
	AUTH_ADMIN,
};
