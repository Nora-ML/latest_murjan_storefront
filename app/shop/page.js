import ShopItems from "@/app/components/shop/shop_items";
import Pagination from "../components/general/pagination";
import { LIST_PRODUCTS_TEMP } from "@/public/tempDB";
import { getProducts, getProductsCount } from "../lib/serverQueryFnc";

export const dynamic = "force-dynamic";

const ShopPage = async ({ searchParams }) => {
	console.log("[SHOP ROOT PAGE]:SEARCHPARAMS ->", searchParams);
	let search = {};
	let limit = 12;
	let page = searchParams && searchParams?.page ? searchParams.page : 1;
	let offset = (page - 1) * limit;

	let formattedParam = Object.entries(searchParams).map(([k, v], index) => {
		if (k !== "page") {
			let flatArray = v.toString().replaceAll(" ", "+").replaceAll(",", "");
			let theKey = index === 0 ? `?${[k]}=` : `&${[k]}=`;
			let thisParam = theKey + flatArray;
			return thisParam;
		}
	});

	Object.entries(searchParams)?.map(([k, v]) => {
		let arrayOfValue = v.replaceAll(",", "").split(" ");
		search[k] = arrayOfValue;
	});

	let variables = {
		...search,
		limit,
		offset,
	};
	let products = await getProducts("id name price image", variables)
		.then((data) => data)
		.catch((error) => LIST_PRODUCTS_TEMP);
	console.log("[ALL PRODUCTS USING SERVE FUNC]", products);
	let productCount = await getProductsCount("id", { ...search })
		.then((data) => data)
		.catch((error) => 20);

	console.log("[ALL PRODUCTS COUNT]", productCount);

	return (
		<div className="shop_items_container">
			<ShopItems products={products} />
			<Pagination
				itemsPerPage={limit}
				productCount={productCount}
				currentPage={page}
				currentURL={`/shop${formattedParam}`}
			/>
		</div>
	);
};

export default ShopPage;
