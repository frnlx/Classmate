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
      <div className="flex flex-col gap-2">
        <span>Search name:</span>
        <input
          className={ clsx(
            // Dimensions
            "flex h-10 w-full rounded-md px-3 py-2 outline-transparent max-w-sm",
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
