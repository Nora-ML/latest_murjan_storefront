import { LIST_PRODUCTS_TEMP } from "@/public/tempDB";
import { getClient } from "@/app/lib/client";
import {
	PRODUCTS_ADMIN_PAGE,
	ALL_PRODUCTS_COUNT,
} from "@/app/lib/product_used";
//import { SEARCH_PRODUCTS } from "../../components/helpers/search.js";
//main Components
import ProductAdd from "@/app/components/Admin/AddProduct";
//sub components
import Table from "@/app/components/general/Table.js";
import Pagination from "@/app/components/general/pagination";
// styles
//import { Dash_FooterStyle } from "../../components/styles/DashBoard_Style";

const Admin_Product = async ({ searchParams }) => {
	console.log("[ADMIN -PRODUCT PAGE ]-> searchParams", searchParams);

	let formattedParam = Object.entries(searchParams).map(([k, v], index) => {
		if (k !== "page") {
			let flatArray = v.toString().replaceAll(" ", "+").replaceAll(",", "");
			let theKey = index === 0 ? `?${[k]}=` : `&${[k]}=`;
			let thisParam = theKey + flatArray;
			return thisParam;
		}
	});

	let limit = 7;
	let page = searchParams && searchParams?.page ? searchParams.page : 1;
	let offset = (page - 1) * limit;

	let term = null;
	/* const { term } = query; */

	/* const {
		data: { searchproducts },
	} = useSuspenseQuery(SEARCH_PRODUCTS, { variables: { name: term } });*/

	const {
		data: { products },
		loading,
		error,
	} = await getClient().query({
		query: PRODUCTS_ADMIN_PAGE,
		variables: { limit, offset },
	});

	const {
		data: { productCount },
	} = await getClient().query({ query: ALL_PRODUCTS_COUNT });

	let productList = products || LIST_PRODUCTS_TEMP;

	const colHeaders =
		productList?.length > 0 ? Object.keys(productList[0]).slice(1) : false;

	console.log("[PRODUCTS COLHEADERS]", colHeaders);

	return (
		<>
			<p className="admin_display_controls_right">Products: {productCount}</p>

			<div className="admin_display_content">
				{loading ? (
					<p>loading...</p>
				) : colHeaders ? (
					<Table colHeaders={colHeaders} data={productList} type="product" />
				) : (
					<div>
						<h2>No products Added</h2>{" "}
						<p>
							Please add a category and collection before adding your first
							product
						</p>
					</div>
				)}
			</div>
			<div className="admin_display_footer">
				<Pagination
					itemsPerPage={limit}
					productCount={productCount}
					currentPage={page}
					currentURL={`/admin/products${formattedParam}`}
				/>
			</div>

			{/* <Dash_FooterStyle className="admin_display_footer">
				PAGES
			</Dash_FooterStyle> */}

			<ProductAdd />
		</>
	);
};

export default Admin_Product;
