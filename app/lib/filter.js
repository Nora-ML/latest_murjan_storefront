import { gql } from "@apollo/client";

const FILTER_PRODUCTS = gql`
	query FilterProducts(
		$category: [ID]
		$collection: [ID]
		$limit: Int! = 0
		$offset: Int!
	) {
		filterProducts(
			category: $category
			collection: $collection
			limit: $limit
			offset: $offset
		) {
			name
			image
			id
			price
		}
	}
`;
const FILTER_PRODUCTS_COUNT = gql`
	query FilterProductsCount($category: [ID], $collection: [ID]) {
		filterProductsCount(category: $category, collection: $collection)
	}
`;

export { FILTER_PRODUCTS, FILTER_PRODUCTS_COUNT };
