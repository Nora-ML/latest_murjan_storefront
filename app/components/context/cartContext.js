"use client";
import { createContext, useReducer, useState } from "react";
import { sumItems } from "./cartReducer";
import cartReducer from "./cartReducer";

export const CartContext = createContext();

const cartFromStorage = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: [];

const initialState = {
	cartItems: cartFromStorage,
	...sumItems(cartFromStorage),
};

const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);
	const [inCart, setInCart] = useState(false);

	const addToCart = (product) =>
		dispatch({ type: "ADD_ITEM", payload: product });

	const addMore = (product) => dispatch({ type: "INCREASE", payload: product });
	const decreaseQuantity = (id) => dispatch({ type: "DECREASE", payload: id });
	const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });

	console.log("CART_CONTEXT FINAL-STATE", state);

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				addMore,
				inCart,
				setInCart,
				removeFromCart,
				decreaseQuantity,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
