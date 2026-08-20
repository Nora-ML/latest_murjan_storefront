import { useEffect, useState, useContext } from "react";
import { EditDrawerContext } from "../../context/editDrawerContext";
import ProductEdit from "../../Admin/EditProduct";
import "./editDrawer.css";

const ShopItemEdit = ({ productId }) => {
	console.log("[EDIT COMPOENENT] productId", productId);

	let { drawerState, setDrawerState, closeEditOnClick } =
		useContext(EditDrawerContext);

	return (
		<>
			<p
				className="shop_item-admin_icons edit"
				onClick={() => setDrawerState(productId)}></p>
			{drawerState && (
				<dialog className="shop_page-editdrawer" onClick={closeEditOnClick}>
					<ProductEdit />
				</dialog>
			)}
		</>
	);
};

export default ShopItemEdit;
