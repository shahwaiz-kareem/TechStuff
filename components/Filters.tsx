// *********************
// Role of the component: Responsive product filters
// Name of the component: Filters.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <Filters />
// Input parameters: no input parameters
// Output: Responsive availability, price and rating filters
// *********************

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown, FaSliders } from "react-icons/fa6";

import { usePaginationStore } from "@/app/_zustand/paginationStore";
import { useSortStore } from "@/app/_zustand/sortStore";

interface InputCategory {
  inStock: {
    text: string;
    isChecked: boolean;
  };
  outOfStock: {
    text: string;
    isChecked: boolean;
  };
  priceFilter: {
    text: string;
    value: number;
  };
  ratingFilter: {
    text: string;
    value: number;
  };
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: {
      text: "instock",
      isChecked: true,
    },
    outOfStock: {
      text: "outofstock",
      isChecked: true,
    },
    priceFilter: {
      text: "price",
      value: 3000,
    },
    ratingFilter: {
      text: "rating",
      value: 0,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams();

    params.set(
      "outOfStock",
      inputCategory.outOfStock.isChecked.toString()
    );

    params.set(
      "inStock",
      inputCategory.inStock.isChecked.toString()
    );

    params.set(
      "rating",
      inputCategory.ratingFilter.value.toString()
    );

    params.set(
      "price",
      inputCategory.priceFilter.value.toString()
    );

    params.set("sort", sortBy);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  }, [inputCategory, sortBy, page, pathname, replace]);

  return (
    <>
      {/* Mobile filter trigger */}
      <button
        type="button"
        onClick={() => setFiltersOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-brand/30 hover:text-brand lg:hidden"
        aria-expanded={filtersOpen}
      >
        <span className="flex items-center gap-2">
          <FaSliders className="text-brand" />
          Filters
        </span>

        <FaChevronDown
          className={`text-xs text-slate-400 transition-transform duration-200 ${
            filtersOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Filter panel */}
      <aside
        className={`
          ${filtersOpen ? "block" : "hidden"}
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          lg:sticky
          lg:top-28
          lg:block
          lg:p-6
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-950">
              Filters
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Refine the product collection
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <FaSliders className="text-sm" />
          </div>
        </div>

        <div className="my-6 h-px bg-slate-100" />

        {/* Availability */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900">
            Availability
          </h3>

          <div className="mt-4 space-y-3">
            <label className="group flex cursor-pointer items-center justify-between rounded-lg p-2 -mx-2 transition hover:bg-slate-50">
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={inputCategory.inStock.isChecked}
                  onChange={() =>
                    setInputCategory((previous) => ({
                      ...previous,
                      inStock: {
                        ...previous.inStock,
                        isChecked: !previous.inStock.isChecked,
                      },
                    }))
                  }
                  className="checkbox h-5 w-5 rounded-md border-slate-300 checked:border-brand checked:bg-brand [--chkfg:white] focus:ring-brand/20"
                />

                <span className="text-sm text-slate-700 transition-colors group-hover:text-slate-950">
                  In stock
                </span>
              </span>

              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </label>

            <label className="group flex cursor-pointer items-center justify-between rounded-lg p-2 -mx-2 transition hover:bg-slate-50">
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={inputCategory.outOfStock.isChecked}
                  onChange={() =>
                    setInputCategory((previous) => ({
                      ...previous,
                      outOfStock: {
                        ...previous.outOfStock,
                        isChecked: !previous.outOfStock.isChecked,
                      },
                    }))
                  }
                  className="checkbox h-5 w-5 rounded-md border-slate-300 checked:border-brand checked:bg-brand [--chkfg:white] focus:ring-brand/20"
                />

                <span className="text-sm text-slate-700 transition-colors group-hover:text-slate-950">
                  Out of stock
                </span>
              </span>

              <span className="h-2 w-2 rounded-full bg-slate-300" />
            </label>
          </div>
        </section>

        <div className="my-6 h-px bg-slate-100" />

        {/* Price */}
        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Maximum price
            </h3>

            <span className="rounded-md bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
              ${inputCategory.priceFilter.value}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={3000}
            step={10}
            value={inputCategory.priceFilter.value}
            onChange={(e) =>
              setInputCategory((previous) => ({
                ...previous,
                priceFilter: {
                  text: "price",
                  value: Number(e.target.value),
                },
              }))
            }
            className="range mt-5 h-2 w-full [--range-shdw:theme(colors.brand.DEFAULT)]"
          />

          <div className="mt-2 flex justify-between text-[11px] text-slate-400">
            <span>$0</span>
            <span>$750</span>
            <span>$1,500</span>
            <span>$2,250</span>
            <span>$3,000</span>
          </div>
        </section>

        <div className="my-6 h-px bg-slate-100" />

        {/* Rating */}
        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Minimum rating
            </h3>

            <span className="rounded-md bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
              {inputCategory.ratingFilter.value}+
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={inputCategory.ratingFilter.value}
            onChange={(e) =>
              setInputCategory((previous) => ({
                ...previous,
                ratingFilter: {
                  text: "rating",
                  value: Number(e.target.value),
                },
              }))
            }
            className="range mt-5 h-2 w-full [--range-shdw:theme(colors.brand.DEFAULT)]"
          />

          <div className="mt-2 flex justify-between px-0.5 text-[11px] text-slate-400">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </section>

        {/* Product showcase website:
            No buying/order/shipping filters are added here.
        */}
      </aside>
    </>
  );
};

export default Filters;
