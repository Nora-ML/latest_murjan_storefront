import { getProducts, getProductById } from "@/app/lib/serverQueryFnc";
import ProductPage from "@/app/components/product/ProductPage";

export const generateStaticParams = async () => {
	let products = await getProducts("id");
	return products.map((productId) => ({
		id: productId.id,
	}));
};

const Product = async ({ params }) => {
	console.log("[PRODUCT PAGE INTERCEPT]: params", params);

	let product = await getProductById("all", params)
		.then((data) => data)
		.catch((error) => {
			return {
				__typename: "Product",
				id: "63c851ee41eafef236f3a67d",
				name: "Butterfly Silhouette Diamond Ring",
				price: 6500,
				discounted_price: null,
				stock: 10,
				description:
					"Our Butterfly Silhouette ring in white gold features two layers of butterfly wings illuminated with pavé diamonds and gently angled to capture a subtle sense of three-dimensionality and movement.",
				category: {
					__typename: "Category",
					name: "Rings",
					id: "63c6a69026ba410db424aef7",
				},
				collection: {
					__typename: "Collection",
					name: "Butterfly Collection",
					id: "63c81060ba465ee242089920",
				},
				options: {
					__typename: "ProductOptions",
					gems: [],
					metal_colors: [],
					sizes: [],
				},
				image: ["https://murjan-opti.s3.amazonaws.com/butterfly_ring_1.png"],
			};
		});

	return <ProductPage product={product} />;
};
export default Product;
