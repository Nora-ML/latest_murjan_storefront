import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
	mutation AddProduct(
		$image: [String]!
		$name: String!
		$price: Int!
		$stock: Int!
		$description: String!
		$item_tags: [ID]!
		$item_category: ID!
		$item_collection: ID!
		$item_offer: ID!
		$options: AddProOptions!
	) {
		addProduct(
			image: $image
			name: $name
			price: $price
			stock: $stock
			description: $description
			item_tags: $item_tags
			item_category: $item_category
			item_offer: $item_offer
			item_collection: $item_collection
			options: $options
		) {
			name
			description
			item_tags {
				id
			}
			item_collection {
				id
			}
			item_category {
				id
			}
			item_offer {
				id
			}
			image
			stock
			price
		}
	}
`;

const COUNT_PRODUCTS = gql`
	query CountProducts($category: [ID]! = [], $collection: [ID]! = []) {
		countProducts(category: $category, collection: $collection) {
			count
		}
	}
`;
const UPLOAD_FILE = gql`
	mutation SignS3($fileName: String!, $fileType: String!) {
		signS3(fileName: $fileName, fileType: $fileType) {
			url
			signedRequest
		}
	}
`;

const FEATURED_PRODUCTS = gql`
	query FeaturedProducts {
		featuredProducts {
			categoryName
			categoryId
			featuredProducts {
				name
				price
				image
				id
			}
		}
	}
`;

export { ADD_PRODUCT, UPLOAD_FILE, COUNT_PRODUCTS, FEATURED_PRODUCTS };
