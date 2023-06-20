"use client";

import React from "react";
import { useSearchFilter } from "./SearchFilterContext";
import clsx from "clsx";

// function Checkbox(p: {
//   label: string;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
// }) {
//   return (
//     <div className="flex items-center">
//       <input
//         checked
//         type="checkbox"
//         onChange={ p.onChange }
//         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//       />
//       <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//         { p.label }
//       </label>
//     </div>
//   );
// }

export default function SearchFilter() {
  const { setFilters, setName } = useSearchFilter();
  return (
    <>
      {/* <span>Filters:</span>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <Checkbox
            label="Submitted"
            onChange={ (e) =>
              setFilters((filters) => ({
                ...filters,
                submitted: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Not Submitted"
            onChange={ (e) =>
              setFilters((filters) => ({
                ...filters,
                notSubmitted: e.target.checked,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Checkbox
            label="Rewards given"
            onChange={ (e) =>
              setFilters((filters) => ({
                ...filters,
                given: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Rewards rejected"
            onChange={ (e) =>
              setFilters((filters) => ({
                ...filters,
                notGiven: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Rewards not given"
            onChange={ (e) =>
              setFilters((filters) => ({
                ...filters,
                ungraded: e.target.checked,
              }))
            }
          />
        </div>
      </div> */}
      <div className="flex flex-row gap-1 bg-dark2 pl-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#ffffff" viewBox="0 0 256 256" className="self-center"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
        <input
          className={ clsx(
            // Dimensions
            "flex h-8 w-full rounded-r-lg px-3 py-2 outline-transparent max-w-sm",
            // Colors
            "!bg-dark0 border ring-dark2/50 ",
            // Text
            "text-sm",
            // Animation
            "transition-all ring-0",
            // Placeholder
            "placeholder:text-muted-foreground",
            // Focus Visible
            "focus-visible:outline-none",
            "focus-visible:ring-4",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50"
          ) }
          onChange={ (e) => setName(e.target.value) }
        />
      </div>
    </>
  );
}
