// *********************
// Role of the component: Modern featured products section for the home page
// Name of the component: ProductsSection.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <ProductsSection />
// Input parameters: no input parameters
// Output: Responsive featured products showcase grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import apiClient from "@/lib/api";

const ProductsSection = async () => {
  let products = [];

  try {
    // Sending API request for getting all products
    const data = await apiClient.get("/api/products");

    if (!data.ok) {
      console.error("Failed to fetch products:", data.statusText);
      products = [];
    } else {
      const result = await data.json();

      // Ensure products is an array
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  return (
    <section
      id="products"
      className="border-t border-slate-100 bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Our collection
            </p>

            <Heading title="Featured Products" />

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Take a closer look at some of the latest products in our
              collection.
            </p>
          </div>

          {products.length > 0 && (
            <span className="hidden text-sm font-medium text-slate-400 lg:block">
              {products.length} products
            </span>
          )}
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <div className="text-center">
              <p className="text-base font-medium text-slate-700">
                No products available
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Please check back soon for new products.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
