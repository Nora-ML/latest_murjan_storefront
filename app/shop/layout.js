import ShopHeroCont from "../components/shop/shop_hero_cont";
import { getCategory, getCollection, getUser } from "../lib/serverQueryFnc";
import { LIST_TEMP_COLLECTIONS, LIST_TEMP_CATEGORIES } from "@/public/tempDB";

import "./shop.css";
import Nav from "../components/Navigation/Nav";

const ShopLayout = async ({ children }) => {
	let categories = await getCategory("id name", "")
		.then((data) => data)
		.catch((error) => LIST_TEMP_CATEGORIES);
	let collections = await getCollection("id name", "")
		.then((data) => data)
		.catch((error) => LIST_TEMP_COLLECTIONS);

	let user = await getUser("name role access");
	//let collections = [{ name: "spiral", id: "26472673817" }];
	//let categories = [{ name: "ring", id: "26472673817" }];

	console.log("CATEGORIES", categories);
	console.log("COLLECTIONS", collections);

	if (!categories || !collections) {
		return (
			<h2
				style={{ height: "100vh", position: "fixed", backgroundColor: "red" }}>
				LOADING...
			</h2>
		);
	}

	return (
		<>
			<Nav currentUser={user} />
			<ShopHeroCont categories={categories} collections={collections} />
			{children}
		</>
	);
};

export default ShopLayout;

{
	/* <>
			<ApolloWrapper>
				<div className="layout_container">
					<ShopHeroCont categories={categories} collections={collections} />
					{children}
					<Footer />
				</div>
			</ApolloWrapper>
			<Script src="/locoAll.js" />
		</> */
}
