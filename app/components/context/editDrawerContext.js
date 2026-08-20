import { createContext, useState, useEffect } from "react";

export const EditDrawerContext = createContext();

const EditDrawerContextProvider = ({ children }) => {
	console.log("[EDIT DRAWER CONTEXT] ");
	const [drawerState, setDrawerState] = useState(false);

	let closeEditOnSuccess = () => {
		console.log("[EDIT CLOSE EDIT ON SUCCESS");
		let drawer = document.querySelector(".shop_page-editdrawer");
		let form = document.querySelector(".main_form");
		drawer.classList.add("hide");
		form.classList.add("hide");

		setTimeout(() => {
			drawer.close();
			setDrawerState(false);
		}, 500);
	};
	let closeEditOnClick = (e) => {
		console.log("[EDIT CLOSE EDIT ON CLICK OVERLAY");
		let body = document.querySelector("body");
		body.style.overflowY = "auto";
		let xDrawerPosition = e.target.getBoundingClientRect().left;
		let xClickPosition = e.clientX;
		if (xClickPosition < xDrawerPosition) {
			console.log("[DRAWER] close");
			closeEditOnSuccess();
		}
	};
	useEffect(() => {
		console.log("[ITEM EDIT COMPOENENT] useEffect: ", drawerState);
		if (drawerState) {
			console.log(
				"[ITEM EDIT COMPOENENT] ACTIVATING:drawerState ",
				drawerState
			);
			let body = document.querySelector("body");
			let drawer = document.querySelector(".shop_page-editdrawer");
			let form = document.querySelector(".main_form");
			body.style.overflowY = "hidden";
			drawer.classList.remove("hide");
			form ? form.classList.remove("hide") : "";
			drawer.showModal();
		}
	}, [drawerState]);

	return (
		<EditDrawerContext.Provider
			value={{
				drawerState,
				setDrawerState,
				closeEditOnClick,
				closeEditOnSuccess,
			}}>
			{children}
		</EditDrawerContext.Provider>
	);
};

export default EditDrawerContextProvider;
