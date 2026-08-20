import { useState } from "react";
import Form from "../../Forms/Form";
import Modal from "../../general/modal";
import "./editDrawer.css";
const ShopItemDelete = (productId) => {
	const [state, setState] = useState(false);

	let formWidth = "narrow";

	const deleteModal = (
		<Modal>
			<h2>This product will be Permanently deleted?</h2>
			<Form
				mutationFunction=""
				formWidth={formWidth}
				formButton={[{ type: "submit", style: "fill", value: "Accept" }]}
			/>
		</Modal>
	);
	return <></>;
};

export default ShopItemDelete;
