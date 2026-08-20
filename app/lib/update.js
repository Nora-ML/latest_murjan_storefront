import { gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
	mutation UpdateProduct($input: CreateProductInput) {
		updateProduct(input: $input) {
			name
			description
			image
			stock
			price
		}
	}
`;
const UPDATE_COLLECTION = gql`
	mutation UpdateCollection(
		$id: ID!
		$name: String!
		$description: String!
		$slug: String!
		$image: [String]!
	) {
		updateCollection(
			id: $id
			name: $name
			description: $description
			slug: $slug
			image: $image
		) {
			id
			name
		}
	}
`;

const UPDATE_USER_USER = gql`
	mutation UpdateUser(
		$id: ID!
		$name: String!
		$email: String!
		$password: String!
	) {
		updateUser(id: $id, name: $name, email: $email, password: $password) {
			id
			name
			email
			password
		}
	}
`;
const UPDATE_USER_ADMIN = gql`
	mutation UpdateUserAdmin($id: ID!, $role: String!) {
		updateUserAdmin(id: $id, role: $role) {
			id
			name
			email
			role
		}
	}
`;
const UPDATE_CATEGORY = gql`
	mutation UpdateCategory(
		$id: ID!
		$name: String!
		$description: String!
		$slug: String!
		$image: [String]!
	) {
		updateCategory(
			id: $id
			name: $name
			description: $description
			slug: $slug
			image: $image
		) {
			id
			name
		}
	}
`;
const UPDATE_TAG = gql`
	mutation UpdateTag(
		$id: ID!
		$name: String!
		$description: String!
		$slug: String!
	) {
		updateTag(id: $id, name: $name, description: $description, slug: $slug) {
			id
			name
		}
	}
`;
const UPDATE_OFFER = gql`
	mutation UpdateOffer(
		$id: ID!
		$name: String!
		$description: String!
		$percentage: Int!
		$amount: Int!
		$slug: String!
	) {
		updateOffer(
			id: $id
			name: $name
			description: $description
			percentage: $percentage
			amount: $amount
			slug: $slug
		) {
			id
			name
		}
	}
`;

const UPDATE_LANDING_PAGE = gql`
	mutation UpdateLandingPage(
		$hero: HeroUpdate!
		$about: AboutUpdate!
		$parallel_slide_display: [ParallelSlideUpdate]!
	) {
		updateLandingPage(
			hero: $hero
			about: $about
			parallel_slide_display: $parallel_slide_display
		) {
			id
		}
	}
`;

const update = (cache, payload) => {
	const { data } = payload;
	const key = Object.keys(data)[0];
	cache.evict(cache.identify(payload.data[key]));
};

const UPDATE_ABOUT = gql`
	mutation UpdateAbout(
		$about_image: [String]
		$about_header: String
		$about_sub_header: String
		$about_second_sub_header: String
	) {
		updateAbout(
			about_image: $about_image
			about_header: $about_header
			about_sub_header: $about_sub_header
			about_second_sub_header: $about_second_sub_header
		) {
			id
		}
	}
`;

const UPDATE_HERO = gql`
	mutation UpdateHero(
		$hero_media: [String]
		$hero_header: String
		$hero_sub_header: String
	) {
		updateHero(
			hero_media: $hero_media
			hero_header: $hero_header
			hero_sub_header: $hero_sub_header
		) {
			id
		}
	}
`;

const UPDATE_PARALLEL_SLIDE = gql`
	mutation updateParallelSlide(
		$slide_id: Int!
		$parallelS_main_media: imageInput
		$parallelS_secondary_media: imageInput
		$parallelS_description: String
	) {
		updateParallelSlide(
			slide_id: $slide_id
			parallelS_main_media: $parallelS_main_media
			parallelS_secondary_media: $parallelS_secondary_media
			parallelS_description: $parallelS_description
		) {
			slide_id
		}
	}
`;

export {
	UPDATE_LANDING_PAGE,
	UPDATE_PRODUCT,
	UPDATE_COLLECTION,
	UPDATE_TAG,
	UPDATE_CATEGORY,
	UPDATE_USER_ADMIN,
	UPDATE_USER_USER,
	UPDATE_OFFER,
	UPDATE_HERO,
	UPDATE_PARALLEL_SLIDE,
	UPDATE_ABOUT,
	update,
};
