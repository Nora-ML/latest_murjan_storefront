"use server";
import { gql } from "@apollo/client";
import { getClient } from "./client";
import { handleError } from "./serverMutationFnc";
import { cookies } from "next/headers";

const getProducts = async (fields, variables) => {
	console.log("fields", fields);
	let PRODUCTS = gql`
	query Products($category: [ID] $collection: [ID] $limit: Int $offset: Int	) {
		products( category: $category collection: $collection limit: $limit offset: $offset) {
			${fields}
			}
		}`;

	try {
		let {
			data: { products },
		} = await getClient().query({
			query: PRODUCTS,
			variables: { ...variables },
		});

		return products;
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const getProductById = async (fields, variables) => {
	let all =
		"id name price discounted_price stock description category {name id} collection {name id} options {gems	metal_colors sizes} image";
	let adjust = fields === "all" ? all : fields;

	let PRODUCT = gql`query Product($id: ID) {
		product(id: $id) {
			${adjust}
			}
		}
	`;

	try {
		const {
			data: { product },
		} = await getClient().query({
			query: PRODUCT,
			variables: variables,
		});
		return product;
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const getProductsCount = async (fields, variables) => {
	const PRODUCTS_COUNT = gql`
		query ProductsCount($category: [ID], $collection: [ID]) {
			productsCount(category: $category, collection: $collection)
		}
	`;

	try {
		let {
			data: { productsCount },
		} = await getClient().query({
			query: PRODUCTS_COUNT,
			variables: variables,
		});

		return productsCount;
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const getCategory = async (fields, variables) => {
	const CATEGORIES = gql`
		query Categories {
			categories {
				${fields}
			}
		}
	`;

	try {
		let { data } = await getClient().query({ query: CATEGORIES });

		return await data.categories;
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const getCollection = async (fields, variables) => {
	const COLLECTIONS = gql`
		query Collections {
			collections {
				${fields}
			}
		}
	`;

	try {
		let { data } = await getClient().query({ query: COLLECTIONS });
		return await data.collections;
	} catch (error) {
		let errorMsg = handleError(error);
		throw new Error(errorMsg);
	}
};
const getUser = async (fields) => {
	let cookieObject = cookies().get("session");
	const GETUSER = gql`
		query AuthUser{
	    	authUser{
				${fields}
	   		}
		}`;

	if (cookieObject?.value) {
		let { value } = cookieObject;
		try {
			const {
				data: { authUser },
			} = await getClient().query({
				query: GETUSER,
				context: {
					headers: {
						authorization: value ? `Bearer ${value}` : "",
					},
				},
			});
			console.log("COOOOOKIE FETCHED DATA", authUser);
			return await { ...authUser };
		} catch (error) {
			console.log("FAAAILED FETCHED USER FROM COOKIE", error);
		}
	}
};
const getLanding = async () => {
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

	try {
		const {
			data: { landing },
		} = await getClient().query({ query: LANDING });

		console.log("FETCHED in LANDING", landing);
		return landing;
	} catch (error) {
		console.log("ERROR in LANDING", error);
	}
};
const logOut = () => {
	const hasCookie = cookies().has("session");
	if (hasCookie) {
		cookies().delete("session");
	} else {
		console.log("NO COOKIE STORED IN SESSION");
	}
};

export {
	logOut,
	getLanding,
	getUser,
	getProducts,
	getProductById,
	getProductsCount,
	getCategory,
	getCollection,
};
