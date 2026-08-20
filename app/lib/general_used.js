import { gql } from "@apollo/client";

const CATEGORIES_NAME_ID = gql`
	query Categories {
		categories {
			id
			name
		}
	}
`;

const COLLECTIONS_NAME_ID = gql`
	query Collections {
		collections {
			id
			name
		}
	}
`;

const TAGS_NAME_ID = gql`
	query Tags {
		tags {
			name
			id
		}
	}
`;

export { CATEGORIES_NAME_ID, COLLECTIONS_NAME_ID, TAGS_NAME_ID };
