const Delete = ({ func }) => {
	console.log("[DELETE ICON] func:", func);
	return (
		<div className="delete_icon-wrapper" onClick={func}>
			<img className="delete_icon" src="./delete_icon.png" alt="" />
		</div>
	);
};

export default Delete;
