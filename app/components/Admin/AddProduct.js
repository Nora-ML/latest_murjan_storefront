"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
// queries and mutations
import {
	CATEGORIES_NAME_ID,
	COLLECTIONS_NAME_ID,
	TAGS_NAME_ID,
} from "@/app/lib/general_used";
import { PRODUCTS_ADMIN_PAGE } from "@/app/lib/product_used";
import { ADD_PRODUCT } from "@/app/lib/product";
//components
import Form from "../Forms/Form";
//styles
import "./addPage.css";

const ProductAdd = ({ data, location, classInitial, alterClass }) => {
	console.log("[PRODUCT ADD COMPONENT]");
	let access = "admin_full";
	const [counter, setCounter] = useState(0);

	const { data: { categories } = {} } = useQuery(CATEGORIES_NAME_ID);
	const { data: { collections } = {} } = useQuery(COLLECTIONS_NAME_ID);
	const { data: { tags } = {} } = useQuery(TAGS_NAME_ID);

	const [addProduct] = useMutation(ADD_PRODUCT, {
		refetchQueries: [{ query: PRODUCTS_ADMIN_PAGE }],
	});

	if (!categories || !tags || !collections)
		return <p className="loading_Product">Fetching Edit Form ..</p>;

	const activate = () => {
		if (access && (access === "admin_full" || access === "admin_limited")) {
			if (
				(categories && categories.length < 1) ||
				(collections && collections.length < 1)
			) {
				alert("You Need to add Categories and collections first");
			} else {
				if (counter === 0 || counter === 1) {
					setCounter(2);
				} else {
					setCounter(1);
				}
			}
		} else {
			alert("You are Not authorized To Add A Product");
		}
	};

	const imageData = [];

	let width = "wide";

	const formFrame = (
		fnc,
		header,
		btnsNumb,
		extraBtn,
		extraProperty,
		itemId
	) => {
		return (
			<Form
				formWidth={width}
				formFields={{ formData, imageData, itemId }}
				mutationFunction={[fnc]}
				formHeader={`${header} Product`}
				mainFormInputs={[
					{
						type: "text",
						label: "Name",
						name: "name",
						placeholder: "Product Name..",
						required: "true",
					},
					/* Numbers */
					{
						type: "number",
						label: "Stock/QTY",
						name: "stock",
						placeholder: "0",
						required: "true",
					},
					{
						type: "number",
						label: "Price",
						name: "price",
						placeholder: "0",
						required: "true",
					},
					/* File */
					{
						type: "file",
						label: "Image",
						name: "image",
						required: "true",
					},
					/* Dropdown */
					{
						type: "dropdown",
						label: "Category",
						name: "item_category",
						required: "true",
						data: categories,
					},
					{
						type: "dropdown",
						label: "Collection",
						name: "item_collection",
						required: "true",
						data: collections,
					},
					{
						type: "dropdown",
						label: "Offers",
						name: "item_offer",
						data: offers,
					},
					{
						type: "dropdown",
						label: "Tags",
						name: "item_tags",
						data: tags,
						multiple: "true",
						additionalText: 'hold down "ctrl" for multiple selection',
					},
					/* textArea */
					{
						type: "textarea",
						label: "Description",
						name: "description",
						placeholder: "Product description..",
						required: "true",
					},
				]}
				subFormInputs={[
					{
						parentForm: "options",
						type: "text",
						label: "Size",
						name: "sizes",
						placeholder: "Seperate size by a comma please",
					},
					{
						parentForm: "options",
						type: "text",
						label: "Gems",
						name: "gems",
						placeholder: "Seperate gems by comma please",
					},
					{
						parentForm: "options",
						type: "text",
						label: "Metal Colors",
						name: "metal_colors",
						placeholder: "Seperate colors by comma please",
					},
				]}
				btnCount={btnsNumb}
				formButton={[extraBtn, { type: "submit", value: `${header} Product` }]}
				classN={extraProperty}
			/>
		);
	};

	const addPage = () => (
		<div
			className={
				!counter
					? "add_page_wrapper initialPage"
					: counter === 2
					? "add_page_wrapper openPage"
					: "add_page_wrapper closePage"
			}>
			<div className="trigger" onClick={activate}>
				<h1>{counter === 2 ? "x" : "+"}</h1>
			</div>
			{counter === 2 ? formFrame(addProduct, "Add") : ""}
		</div>
	);

	const updatePage = () => ({
		/* <UpdatePage location={location} className={classInitial}>
			<FormAndHeaderWrap width={width}>
				<h1 className="form_header">Update Product</h1>
				{classInitial === "openPage"
					? formFrame(
							updateProduct,
							"Update",
							2,
							{ type: "cancel", value: "Cancel" },
							alterClass,
							{ id: fetchedForm.id }
					  )
					: ""}
			</FormAndHeaderWrap>
		</UpdatePage> */
	});

	return data ? updatePage() : addPage();
};

export default ProductAdd;
