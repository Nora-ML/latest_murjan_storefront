import { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
	let [filter, setFilter] = useState({});

	console.log("FILTER In CONTEXT", filter);
	return (
		<FilterContext.Provider value={{ filter, setFilter }}>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;
