// *********************
// Role of the component: Product sorting control
// Name of the component: SortBy.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <SortBy />
// Input parameters: no input parameters
// Output: Modern responsive product sorting select
// *********************

"use client";

import React from "react";
import { FaArrowDownWideShort } from "react-icons/fa6";

import { useSortStore } from "@/app/_zustand/sortStore";

const SortBy = () => {
  const { sortBy, changeSortBy } = useSortStore();

  return (
    <div className="flex w-full items-center gap-3 sm:w-auto">
      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 sm:flex">
        <FaArrowDownWideShort className="text-sm" />
      </div>

      <div className="relative w-full sm:w-auto">
        <label
          htmlFor="sort-products"
          className="sr-only"
        >
          Sort products
        </label>

        <select
          id="sort-products"
          value={sortBy}
          onChange={(e) => changeSortBy(e.target.value)}
          name="sort"
          className="
            h-11
            w-full
            min-w-0
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            pr-10
            text-sm
            font-medium
            text-slate-700
            shadow-sm
            outline-none
            transition
            duration-200
            hover:border-brand/30
            focus:border-brand
            focus:ring-4
            focus:ring-brand/10
            sm:w-48
          "
        >
          <option value="defaultSort">
            Sort: Featured
          </option>

          <option value="titleAsc">
            Name: A-Z
          </option>

          <option value="titleDesc">
            Name: Z-A
          </option>

          <option value="lowPrice">
            Price: Low to High
          </option>

          <option value="highPrice">
            Price: High to Low
          </option>
        </select>

        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortBy;
