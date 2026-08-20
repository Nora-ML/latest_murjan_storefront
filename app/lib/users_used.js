import { gql } from "@apollo/client";

const LIST_USERS = gql`
	query Users {
		users {
			name
			email
			access
			id
		}
	}
`;
const SIGNUP = gql`
	mutation SignUp($name: String!, $email: String!, $password: String!) {
		signUp(name: $name, email: $email, password: $password) {
			message
		}
	}
`;

const SIGNIN = gql`
	mutation SignIn($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			token
			user {
				id
				name
				access
			}
		}
	}
`;
export { LIST_USERS, SIGNUP, SIGNIN };
