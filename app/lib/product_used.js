import { gql } from "@apollo/client";

const PRODUCTS_ADMIN_PAGE = gql`
	query Products($limit: Int! = 0, $offset: Int! = 0) {
		products(limit: $limit, offset: $offset) {
			name
			image
			price
			collection {
				name
			}
			category {
				name
			}
			tags {
				name
			}
			id
		}
	}
`;

const PRODUCTS_SHOP_PAGE = gql`
	query Products($limit: Int, $offset: Int) {
		products(limit: $limit, offset: $offset) {
			id
			name
			price
			image
		}
	}
`;

const ALL_PRODUCTS_COUNT = gql`
	query ProductCount {
		productCount
	}
`;

export { PRODUCTS_ADMIN_PAGE, PRODUCTS_SHOP_PAGE, ALL_PRODUCTS_COUNT };
