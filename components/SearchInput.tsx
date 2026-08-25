// *********************
// Role of the component: Compact header search input
// Name of the component: SearchInput.tsx
// Developer: Shahwaiz Karim
// Version: 2.1
// Component call: <SearchInput />
// Input parameters: no input parameters
// Output: Search field visually matching the provided header
// *********************

"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sanitize } from "@/lib/sanitize";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const searchProducts = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const sanitizedSearch = sanitize(searchInput).trim();

    if (!sanitizedSearch) return;

    router.push(
      `/search?search=${encodeURIComponent(sanitizedSearch)}`
    );

    setSearchInput("");
  };

  return (
    <form
      onSubmit={searchProducts}
      className="relative w-full"
    >
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search ..."
        aria-label="Search products"
        className="
          h-10
          w-full
          rounded-full
          border
          border-slate-100
          bg-white
          pl-9
          pr-9
          text-[14px]
          text-slate-700
          shadow-[0_3px_12px_rgba(15,23,42,0.06)]
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-400
          hover:border-slate-200
          focus:border-brand/20
          focus:ring-2
          focus:ring-brand/10
        "
      />

      <FaSearch
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-[11px]
          text-slate-400
        "
        aria-hidden="true"
      />

      <button
        type="submit"
        aria-label="Search"
        className="
          absolute
          right-1
          top-1/2
          flex
          h-7
          w-7
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          text-slate-400
          transition-colors
          hover:bg-brand/5
          hover:text-brand
        "
      >
        <FaSearch className="text-[10px]" />
      </button>
    </form>
  );
};

export default SearchInput;
