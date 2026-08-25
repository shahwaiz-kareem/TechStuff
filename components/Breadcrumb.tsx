// *********************
// Role of the component: Responsive page breadcrumb navigation
// Name of the component: Breadcrumb.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <Breadcrumb />
// Input parameters: no input parameters
// Output: Modern responsive breadcrumb navigation
// *********************

import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const Breadcrumb = () => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="pt-5 sm:pt-7 lg:pt-8"
    >
      <ol className="flex items-center gap-2 text-xs sm:text-sm">
        {/* Home */}
        <li className="flex items-center gap-2">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-md px-1.5 py-1 text-slate-500 transition-colors duration-200 hover:text-brand"
          >
            <FaHouse className="text-[11px] transition-colors group-hover:text-brand sm:text-xs" />
            <span>Home</span>
          </Link>
        </li>

        <li aria-hidden="true">
          <FaChevronRight className="text-[9px] text-slate-300" />
        </li>

        {/* Shop */}
        <li className="flex items-center gap-2">
          <Link
            href="/shop"
            className="rounded-md px-1.5 py-1 font-medium text-slate-500 transition-colors duration-200 hover:text-brand"
          >
            Products
          </Link>
        </li>

        <li aria-hidden="true">
          <FaChevronRight className="text-[9px] text-slate-300" />
        </li>

        {/* Current page */}
        <li
          aria-current="page"
          className="min-w-0 max-w-[180px] truncate rounded-md px-1.5 py-1 font-medium text-slate-900 sm:max-w-[300px]"
        >
          All products
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
