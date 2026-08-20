const storeCartItems = (cartItems) => {
	console.log("CART_CONTEXT - STORE-CART, cartItems:", cartItems);
	if (cartItems.length > 0) {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}
};

export const sumItems = (cartItems) => {
	console.log("CART_CONTEXT - SUMITEMS, cartItems:", cartItems);
	storeCartItems(cartItems);
	return {
		itemCount: cartItems
			? cartItems.reduce((total, item) => total + item.quantity, 0)
			: [],
		total: cartItems
			? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
			: [],
		totalItems: cartItems
			? cartItems.reduce((total, item) => total + item.quantity, 0)
			: "",
	};
};

const cartReducer = (state, action) => {
	console.log("CART REDUCER action", action, "state", state);
	let id = action.payload.id;
	let isInCart = state.cartItems.find((item) => item.id === id);
	let itemIndex = isInCart
		? state.cartItems.findIndex((item) => item.id === id)
		: "false";

	switch (action.type) {
		case "ADD_ITEM":
			// check if item in cart
			if (!isInCart) {
				let newCart = [
					...state.cartItems,
					{
						...action.payload,
						quantity: 1,
						total: action.payload.price * 1,
					},
				];
				return {
					...state,
					cartItems: newCart,
					...sumItems(newCart),
				};
			}
		case "INCREASE":
			if (itemIndex !== "false") {
				state.cartItems[itemIndex].quantity++;
				state.cartItems[itemIndex].total =
					state.cartItems[itemIndex].price *
					state.cartItems[itemIndex].quantity;

				return {
					...state,
					cartItems: [...state.cartItems],
					...sumItems([...state.cartItems]),
				};
			}

		case "DECREASE":
			if (isInCart && itemIndex !== "false") {
				state.cartItems[itemIndex].quantity--;
				state.cartItems[itemIndex].total =
					state.cartItems[itemIndex].price *
					state.cartItems[itemIndex].quantity;

				return {
					...state,
					cartItems: [...state.cartItems],
					...sumItems([...state.cartItems]),
				};
			}

		case "REMOVE_ITEM":
			if (isInCart) {
				let newState = state.cartItems.filter((item) => item.id !== id);
				return {
					...state,
					cartItems: [...newState],
					...sumItems([...newState]),
				};
			}
		default:
			return state;
	}
};

export default cartReducer;
