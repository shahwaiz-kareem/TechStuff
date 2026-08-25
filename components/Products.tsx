// *********************
// Role of the component: Display filtered and sorted products
// Name of the component: Products.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <Products params={params} searchParams={searchParams} />
// Input parameters: params, searchParams
// Output: Responsive product showcase grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";

const Products = async ({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const inStockNum =
    searchParams?.inStock === "true" ? 1 : 0;

  const outOfStockNum =
    searchParams?.outOfStock === "true" ? 1 : 0;

  const page = searchParams?.page
    ? Number(searchParams.page)
    : 1;

  let stockMode = "lte";

  if (inStockNum === 1) {
    stockMode = "equals";
  }

  if (outOfStockNum === 1) {
    stockMode = "lt";
  }

  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }

  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  let products = [];

  try {
    const categoryFilter =
      params?.slug && params.slug.length > 0
        ? `filters[category][$equals]=${encodeURIComponent(
            params.slug[0]
          )}&`
        : "";

    const price = Number(searchParams?.price) || 3000;
    const rating = Number(searchParams?.rating) || 0;
    const sort = searchParams?.sort || "defaultSort";

    const endpoint =
      `/api/products?` +
      `filters[price][$lte]=${price}&` +
      `filters[rating][$gte]=${rating}&` +
      `filters[inStock][$${stockMode}]=1&` +
      categoryFilter +
      `sort=${encodeURIComponent(String(sort))}&` +
      `page=${page}`;

    const data = await apiClient.get(endpoint);

    if (!data.ok) {
      console.error(
        "Failed to fetch products:",
        data.statusText
      );
      products = [];
    } else {
      const result = await data.json();

      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              />
            </svg>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            No products found
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Try adjusting your filters or sorting options to
            explore more products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results summary */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {products.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Product grid */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {products.map((product: any) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
