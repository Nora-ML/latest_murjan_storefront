import "./modal.css";

const Modal = ({ children }) => {
	return (
		<div className="modal_backdrop">
			<div className="general_modal">{children}</div>
		</div>
	);
};

export default Modal;
