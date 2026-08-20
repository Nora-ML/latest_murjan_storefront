"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./pagination.css";

const Pagination = ({
	itemsPerPage,
	productCount,
	currentPage,
	currentURL,
}) => {
	let path = usePathname();
	console.log("[PAGINATION ] currentPage:", currentPage);

	let router = useRouter();

	let numberOfItems = productCount;
	let numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

	/* if (currentPage >= 1 && numberOfItems <= itemsPerPage) {
		router.push({ pathname: "/shop?page=1" });
	} */

	return (
		<div className="pagination">
			{[...new Array(numberOfPages)].map((e, index) => {
				return (
					<Link
						href={`${
							currentURL.includes("cat")
								? currentURL + "&page=" + (index + 1)
								: path + "?page=" + (index + 1)
						}`}
						key={index}>
						<p
							key={`pageNumber_${index}`}
							className={`page_number ${
								index + 1 === parseInt(currentPage) ? "active" : ""
							}`}>
							{index + 1}
						</p>
					</Link>
				);
			})}
		</div>
	);
};
export default Pagination;
