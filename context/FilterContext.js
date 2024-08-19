import { createContext, useState } from "react";
const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [results, setResults] = useState([]);
  const [blockChosen, setBlockChosen] = useState("");
  const [streetNameChosen, setStreetNameChosen] = useState("");
  const [resultsAddressChosen, setResultsAddressChosen] = useState("");
  const [map, setMap] = useState()

  const context = {
    filters,
    isFiltered,
    isSelected,
    results,
    blockChosen,
    streetNameChosen,
    resultsAddressChosen,
    selected,
    map,
    setSelected,
    setFilters,
    setIsFiltered,
    setIsSelected,
    setResults,
    setBlockChosen,
    setStreetNameChosen,
    setResultsAddressChosen,
    setMap,
  };

  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
}

export default FilterContext;
