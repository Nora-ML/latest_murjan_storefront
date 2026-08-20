//import Delete from "../Icons/Delete";
//import Edit from "../Icons/Edit";
import Delete from "../Icons/deleteIcon";
import { Increase, Decrease } from "../Icons/ModifyQuantity";
import "./table.css";

const Table = ({ data, type, footer }) => {
	console.log("[TABLE COMPONENT ] data:", data);

	let colHeaders = Object.keys(data[0]);

	console.log("[TABLE] :colHeaders:", colHeaders);

	const tableContents = () => {
		return data.map((item, index) => {
			return (
				<tr key={`${index * Math.random() + item}`}>
					{type !== "cart" && <th>{index}</th>}
					{Object.entries(item).map(([key, value], index) => {
						let uniqueKey = index * 11 * Math.random() + value;
						if (key === "delete") {
							console.log("[TABLE] delete:", key, "VALUE", value);
							return (
								<th key={uniqueKey}>
									<Delete func={value} />
								</th>
							);
						}
						if (key === "quantity") {
							console.log("[TABLE] quantity:", key, "VALUE", value);
							return (
								<th key={uniqueKey}>
									<p style={{ display: "inline-block", height: "100%" }}>
										{value.quantity}
									</p>
									<div className="modifyquantity_wrapper">
										<Increase func={value.increase} />
										<Decrease func={value.decrease} />
									</div>
								</th>
							);
						}
						if (key === "id") {
							return null;
						}
						if (key === "image") {
							return (
								<th key={uniqueKey}>
									<img
										className={
											type === "cart" ? "thumbnail_img large" : "thumbnail_img"
										}
										src={value[0] || "/butterfly_pendant_1.png"}
										alt=""
									/>
								</th>
							);
						} else if (typeof value === "object") {
							return <th key={uniqueKey}>{value?.name || "null"}</th>;
						} else if (key === "id") {
							//console.log("key ,",key)
							return (
								<th key={uniqueKey}>
									{/* <Delete id={value} type={type} />
									<Edit id={value} type={type} /> */}
								</th>
							);
						} else if (key !== "__typename") {
							return <th key={uniqueKey}>{value}</th>;
						}
					})}
				</tr>
			);
		});
	};

	return (
		<table className="table">
			<caption></caption>
			{colHeaders && (
				<thead>
					<tr>
						{type !== "cart" && <th>#</th>}
						{colHeaders.map((header, index) => {
							if (header !== "id") {
								return <th key={`${index * Math.random() + ""}`}>{header}</th>;
							}
						})}
					</tr>
				</thead>
			)}
			<tbody>{tableContents()}</tbody>
			{type !== "cart" && (
				<tfoot>
					<tr>
						<th id="total" colspan={colHeaders.length - 2}>
							Total :
						</th>
						<td>{footer}</td>
					</tr>
				</tfoot>
			)}
		</table>
	);
};
export default Table;
