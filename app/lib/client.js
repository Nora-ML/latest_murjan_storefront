import { HttpLink, ApolloLink } from "@apollo/client";
import {
	NextSSRInMemoryCache,
	NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const endpointURI = "http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward) => {
	//console.log("OPERATION", operation);
	/* let token = getCookie("user");
	//console.log("[AUTHLINK]", token);
	operation.setContext(({ headers }) => {
		//console.log("HEADERS", headers);
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	}); */

	return forward(operation);
});
const link = new HttpLink({ uri: endpointURI });

export const { getClient } = registerApolloClient(() => {
	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link: ApolloLink.from([authLink, link]),
		credentials: "include",
	});
});
