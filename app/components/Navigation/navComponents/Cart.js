import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";

const Cart = () => {
	const path = usePathname();
	const { itemCount } = useContext(CartContext);
	console.log("[CART COMPONENT] : itemCount:", itemCount, "PATH", path);

	return (
		<li
			className={`navContainer-li cart ${
				path.includes("shop") || path.includes("product") ? "" : "remove"
			}`}>
			<Link href="/cart">
				<div className="carticon-wrapper">
					<img
						className="cart-icon"
						src="https://www.freeiconspng.com/uploads/shopping-basket-icon-18.png"
						alt="cart"
					/>
					{itemCount > 0 ? <span className="cart-count">{itemCount}</span> : ""}
				</div>
			</Link>
		</li>
	);
};

export default Cart;
