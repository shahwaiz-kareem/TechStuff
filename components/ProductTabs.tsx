// *********************
// Role of the component: Modern product information tabs
// Name of the component: ProductTabs.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <ProductTabs product={product} />
// Input parameters: { product: Product }
// Output: Clean responsive product description and specifications
// *********************

"use client";

import React, { useState } from "react";
import { FaCircleInfo, FaFileLines } from "react-icons/fa6";
import { formatCategoryName } from "@/utils/categoryFormating";
import { sanitize, sanitizeHtml } from "@/lib/sanitize";

const ProductTabs = ({ product }: { product: Product }) => {
  const [currentProductTab, setCurrentProductTab] = useState<number>(0);

  const tabs = [
    {
      id: 0,
      label: "Description",
      icon: FaFileLines,
    },
    {
      id: 1,
      label: "Additional information",
      icon: FaCircleInfo,
    },
  ];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="border-b border-slate-200 px-5 sm:px-8 lg:px-10">
        <div className="flex gap-6 overflow-x-auto sm:gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = currentProductTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCurrentProductTab(tab.id)}
                className={`
                  relative
                  flex
                  min-h-[62px]
                  shrink-0
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  transition-colors
                  duration-200
                  sm:text-base
                  ${
                    active
                      ? "text-brand"
                      : "text-slate-500 hover:text-slate-900"
                  }
                `}
                aria-selected={active}
                role="tab"
              >
                <Icon className="text-sm" />

                {tab.label}

                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        {/* Description */}
        {currentProductTab === 0 && (
          <div>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Product description
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                About this product
              </h2>
            </div>

            <div
              className="
                max-w-4xl
                text-sm
                leading-7
                text-slate-600
                sm:text-base
                sm:leading-8
                [&_h1]:mb-4
                [&_h1]:text-xl
                [&_h1]:font-bold
                [&_h1]:text-slate-900
                [&_h2]:mb-3
                [&_h2]:mt-6
                [&_h2]:text-lg
                [&_h2]:font-bold
                [&_h2]:text-slate-900
                [&_h3]:mb-2
                [&_h3]:mt-5
                [&_h3]:font-semibold
                [&_h3]:text-slate-900
                [&_p]:mb-4
                [&_ul]:mb-5
                [&_ul]:ml-5
                [&_ul]:list-disc
                [&_li]:mb-2
                [&_strong]:font-semibold
                [&_strong]:text-slate-900
              "
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  product?.description || "No description available."
                ),
              }}
            />
          </div>
        )}

        {/* Additional information */}
        {currentProductTab === 1 && (
          <div>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Specifications
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                Product information
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="divide-y divide-slate-200">
                {/* Manufacturer */}
                <div className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[220px_1fr] sm:items-center sm:px-6">
                  <span className="text-sm font-medium text-slate-500">
                    Manufacturer
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {product?.manufacturer
                      ? sanitize(product.manufacturer)
                      : "Not specified"}
                  </span>
                </div>

                {/* Category */}
                <div className="grid grid-cols-1 gap-2 bg-slate-50/50 px-5 py-4 sm:grid-cols-[220px_1fr] sm:items-center sm:px-6">
                  <span className="text-sm font-medium text-slate-500">
                    Category
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {product?.category?.name
                      ? sanitize(
                          formatCategoryName(
                            product.category.name
                          )
                        )
                      : "Not specified"}
                  </span>
                </div>

                {/* Availability */}
                <div className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[220px_1fr] sm:items-center sm:px-6">
                  <span className="text-sm font-medium text-slate-500">
                    Availability
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      product?.inStock === 1
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {product?.inStock === 1
                      ? "In stock"
                      : "Out of stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 gap-2 bg-slate-50/50 px-5 py-4 sm:grid-cols-[220px_1fr] sm:items-center sm:px-6">
                  <span className="text-sm font-medium text-slate-500">
                    Listed price
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    ${product?.price}
                  </span>
                </div>

                {/*
                Additional ecommerce fields intentionally disabled.

                <div>
                  Delivery
                </div>

                <div>
                  Shipping
                </div>

                <div>
                  Payment methods
                </div>

                <div>
                  Order availability
                </div>
                */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
