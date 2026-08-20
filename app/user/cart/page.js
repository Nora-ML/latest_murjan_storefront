"use client";
import { useContext } from "react";
import { CartContext } from "@/app/components/context/cartContext";
import Table from "@/app/components/general/Table";
import { LIST_PRODUCTS_TEMP } from "@/public/tempDB";

const CartPage = () => {
	let { cartItems } = useContext(CartContext);
	// fetch product from db using id from cartItems

	console.log("[CART PAGE] :cartItems", cartItems);

	return (
		<div>
			<Table colHeaders={false} data={cartItems} />
		</div>
	);
};

export default CartPage;
