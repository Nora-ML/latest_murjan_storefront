import { gql } from "@apollo/client";

const LANDING = gql`
	query Landing {
		landing {
			hero {
				hero_media
				hero_header
				hero_sub_header
			}
			postHero {
				about_second_sub_header
				about_header
				about_image
				about_sub_header
			}
			slideDisplay {
				parallelS_main_media {
					alt
					desktop
					mobile
					tablet
				}
				parallelS_secondary_media {
					alt
					desktop
					mobile
					tablet
				}
				parallelS_description
				slide_id
			}
			id
		}
	}
`;

const COLLECTION_PARAM = gql`
	query Collections {
		collections {
			name
			products {
				id
			}
		}
	}
`;
const CATEGORY_PARAM = gql`
	query Category {
		categories {
			name
			products {
				id
			}
		}
	}
`;
const PRODUCTS_ID = gql`
	query Products {
		products {
			id
		}
	}
`;

const PRODUCT = gql`
	query Product($id: ID) {
		product(id: $id) {
			name
			price
			discounted_price
			stock
			description
			category {
				name
				id
			}
			collection {
				name
				id
			}
			options {
				gems
				metal_colors
				sizes
			}
			image
		}
	}
`;
const PRODUCTS = gql`
	query Products {
		products {
			id
			name
			price
			discounted_price
			stock
			image
		}
	}
`;

const FEATURED_PRODUCTS = gql`
	query Categories($limit: Int) {
		categories {
			name
			id
			products(limit: $limit) {
				name
				image
				id
			}
		}
	}
`;
const CATEGORIES = gql`
	query Categories {
		categories {
			id
			name
			description
			slug
			image
			products {
				id
			}
		}
	}
`;

const COLLECTIONS = gql`
	query Collections {
		collections {
			id
			name
			description
			slug
			image
			products {
				id
			}
		}
	}
`;

export {
	FEATURED_PRODUCTS,
	PRODUCT,
	LANDING,
	CATEGORY_PARAM,
	COLLECTION_PARAM,
	CATEGORIES,
	COLLECTIONS,
	PRODUCTS,
	PRODUCTS_ID,
};
