"use client";
import { useContext } from "react";
import { CartContext } from "@/app/components/context/cartContext";
import Table from "@/app/components/general/Table";
import Link from "next/link";

const CartPage = () => {
	let {
		cartItems,
		total,
		totalItems,
		removeFromCart,
		addMore,
		decreaseQuantity,
	} = useContext(CartContext);
	// fetch product from db using id from cartItems

	console.log("[CART PAGE] :cartItems", cartItems);

	let cart =
		cartItems && cartItems.length > 1
			? cartItems.map((item) => {
					return {
						...item,
						delete: () => removeFromCart({ id: item.id }),
						quantity: {
							quantity: item.quantity,
							increase: () => addMore(item),
							decrease: () => decreaseQuantity({ id: item.id }),
						},
					};
			  })
			: null;

	return (
		<div className="user_cart">
			<h2 className="user_cart-header">CART</h2>
			{cart ? (
				<>
					<div className="user_table-wrapper">
						<Table data={cart} type="cart" footer={total} />
					</div>

					<div className="cart-summary-card">
						<h3>
							Total: <span>$ {total}</span>
						</h3>
						<h3>
							Total Items: <span>{totalItems}</span>
						</h3>
						<button> Checkout</button>
					</div>
				</>
			) : (
				<>
					<h3 className="user_message">Your Cart is Empty !!</h3>
					<p className="user_message">
						<Link href="/shop">Start Shopping !</Link>
					</p>
				</>
			)}
		</div>
	);
};

export default CartPage;
