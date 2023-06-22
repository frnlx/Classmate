"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface FilterType {
  submitted: boolean;
  notSubmitted: boolean;
  given: boolean;
  notGiven: boolean;
  ungraded: boolean;
}

interface SearchFilterContextData {
  name: string;
  filters: FilterType;
  setName: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<FilterType>>;
}

const SearchFilterContext = createContext({} as SearchFilterContextData);

export function SearchFilterContextProvider(p: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({
    submitted: true,
    notSubmitted: true,
    given: true,
    notGiven: true,
    ungraded: true,
  });

  return (
    <SearchFilterContext.Provider
      value={{ name, filters, setName, setFilters }}
    >
      {p.children}{" "}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  return useContext(SearchFilterContext);
}
