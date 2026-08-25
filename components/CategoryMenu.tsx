// *********************
// Role of the component: Category wrapper that contains title and category items
// Name of the component: CategoryMenu.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <CategoryMenu />
// Input parameters: no input parameters
// Output: Modern responsive product category section
// *********************

import React from "react";
import CategoryItem from "./CategoryItem";
import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";

const CategoryMenu = () => {
  return (
    <section
      id="categories"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Explore the collection
            </p>

            <Heading title="Browse Categories" />

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore our collection of electronics and discover the products
              that fit your everyday needs.
            </p>
          </div>

          <span className="hidden text-sm font-medium text-slate-400 lg:block">
            {categoryMenuList.length} categories
          </span>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {categoryMenuList.map((item) => (
            <CategoryItem
              key={item.id}
              title={item.title}
              href={item.href}
              src={item.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
