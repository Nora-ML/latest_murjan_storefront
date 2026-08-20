import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
// queries and mutations
import {
	CATEGORIES_NAME_ID,
	COLLECTIONS_NAME_ID,
	TAGS_NAME_ID,
} from "@/app/lib/general_used";
import { PRODUCT } from "@/app/lib/query";
import {
	PRODUCTS_ADMIN_PAGE,
	PRODUCTS_SHOP_PAGE,
} from "@/app/lib/product_used";
//import { UPDATE_PRODUCT } from "@/app/lib/update";
//components
import Form from "../Forms/Form";
//styles
import { gql } from "@apollo/client";
import { EditDrawerContext } from "../context/editDrawerContext";
import Loading from "../Forms/Messages/loading";

const UPDATE_PRODUCT = gql`
	mutation UpdateProduct($input: CreateProductInput) {
		updateProduct(input: $input) {
			name
			price
			description
			options {
				gems
				sizes
			}
			stock
		}
	}
`;

const ProductEdit = () => {
	console.log("[PRODUCT EDIT COMPOENENT] ");
	let { drawerState, closeEditOnSuccess } = useContext(EditDrawerContext);

	const { data: { product } = {} } = useQuery(PRODUCT, {
		variables: { id: drawerState },
	});
	const { data: { categories } = {} } = useQuery(CATEGORIES_NAME_ID);
	const { data: { collections } = {} } = useQuery(COLLECTIONS_NAME_ID);
	const { data: { tags } = {} } = useQuery(TAGS_NAME_ID);

	const [updateProduct] = useMutation(UPDATE_PRODUCT, {
		/* update: (cache, { data }) => {
			console.log("RESPONSE, WRITE QUERY", data);
			cache.writeQuery({ query: PRODUCT, variables: { id: drawerState }, data });
		}, */
		refetchQueries: [{ query: PRODUCTS_SHOP_PAGE }],
	});

	if (!product || !categories || !tags || !collections)
		return <Loading display="display" />;

	let width = "";

	return (
		<Form
			formWidth={width}
			onSuccess={closeEditOnSuccess}
			mutationFunction={updateProduct}
			formHeader="Edit Product"
			successMsg="Product Successfuly Updated "
			mainFormInputs={[
				{
					type: "hidden",
					name: "id",
					value: drawerState,
				},
				{
					type: "text",
					label: "Name",
					name: "name",
					placeholder: "Product Name..",
					value: product["name"],
				},

				/* Numbers */
				{
					type: "number",
					label: "Stock/QTY",
					name: "stock",
					placeholder: "0",
					value: product["stock"],
				},
				{
					type: "number",
					label: "Price",
					name: "price",
					placeholder: "0",
					value: product["price"],
				},

				/* Dropdown */
				{
					type: "dropdown",
					label: "Category",
					name: "category",
					data: categories,
					value: { id: product.category.id, name: product.category.name },
				},
				{
					type: "dropdown",
					label: "Collection",
					name: "collection",
					value: { id: product.collection.id, name: product.collection.name },
					data: collections,
				},
				/* {
					type: "dropdown",
					label: "Offers",
					name: "offer",
					data: offers,
				}, */
				{
					type: "dropdown",
					label: "Tags",
					name: "tags",
					data: tags,
					multiple: "true",
					additionalText: 'hold down "ctrl" for multiple selection',
					value: product.tag
						? { id: product.tag.id, name: product.tag.name }
						: "",
				},
				/* File */
				{
					type: "file",
					label: "Image",
					name: "image",
					value: product.image ? product.image[0] : "",
				},

				/* textArea */
				{
					type: "textarea",
					label: "Description",
					name: "description",
					placeholder: "Product description..",
					value: product.description,
				},
			]}
			subFormInputs={[
				{
					parentForm: "options",
					type: "text",
					label: "Size",
					datatype: "number",
					name: "sizes",
					placeholder: "Seperate size by a comma please",
					value: product.options ? product.options.sizes : "",
				},
				{
					parentForm: "options",
					type: "text",
					label: "Gems",
					name: "gems",
					placeholder: "Seperate gems by comma please",
					value: product.options ? product.options.gems : "",
				},
				{
					parentForm: "options",
					type: "text",
					label: "Metal Colors",
					name: "metal_colors",
					placeholder: "Seperate colors by comma please",
					value: product.options ? product.options.metal_colors : "",
				},
			]}
			btnCount={2}
			formButton={[
				{ type: "submit", value: "Edit Product", style: "fill" },
				{ type: "cancel", value: "Cancel", style: "border" },
			]}
		/>
	);
};

export default ProductEdit;
