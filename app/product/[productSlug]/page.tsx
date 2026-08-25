// *********************
// Role of the component: Modern product showcase detail page
// Name of the component: SingleProductPage.tsx
// Developer: Shahwaiz Karim
// Version: 3.0
// Component call: <SingleProductPage />
// Input parameters: params
// Output: Modern responsive product showcase detail page
// *********************

import { ProductTabs } from "@/components";
import ProductGallery from "@/components/ProductGallery";
import apiClient from "@/lib/api";
import { sanitize } from "@/lib/sanitize";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

interface SingleProductPageProps {
  params: Promise<{
    productSlug: string;
    id: string;
  }>;
}

const SingleProductPage = async ({
  params,
}: SingleProductPageProps) => {
  const paramsAwaited = await params;

  // Get product
  const data = await apiClient.get(
    `/api/slugs/${paramsAwaited?.productSlug}`
  );

  const product = await data.json();

  if (!product || product.error) {
    notFound();
  }

  // Get additional product images
  const imagesData = await apiClient.get(
    `/api/images/${paramsAwaited?.id}`
  );

  const images = await imagesData.json();

  const productTitle =
    sanitize(product?.title) || "Product";

  const manufacturer =
    product?.manufacturer
      ? sanitize(product.manufacturer)
      : null;

  const category =
    product?.category?.name
      ? sanitize(product.category.name)
      : null;

  return (
    <main className="min-h-screen bg-slate-0">
      <div className="mx-auto max-w-screen-2xl px-4 pb-16 pt-5 sm:px-6 sm:pb-20 lg:px-10 xl:px-12">
        {/* Back navigation */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/shop"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition-colors
              duration-200
              hover:text-brand
            "
          >
            <FaArrowLeft className="text-xs" />
            Back to products
          </Link>
        </div>

        {/* Product overview */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* =========================================
                Gallery
            ========================================== */}
            <div className="border-b border-slate-20 bg-slate-0 p-4 sm:p-7 lg:border-b-0 lg:border-r lg:p-10">
              <ProductGallery
                productTitle={productTitle}
                mainImage={product?.mainImage}
                images={
                  Array.isArray(images) ? images : []
                }
              />
            </div>

            {/* =========================================
                Product information
            ========================================== */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-14">
              {/* Category */}
              {category && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {category}
                </p>
              )}

              {/* Title */}
              <h1
                className="
                  mt-3
                  max-w-xl
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-slate-950
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {productTitle}
              </h1>

              {/* Manufacturer */}
              {manufacturer && (
                <p className="mt-3 text-sm text-slate-500">
                  By{" "}
                  <span className="font-medium text-slate-700">
                    {manufacturer}
                  </span>
                </p>
              )}

              {/* Price */}
              <div className="mt-7">
                <span className="text-3xl font-bold tracking-tight text-slate-950">
                  ${product?.price}
                </span>
              </div>

              {/* Availability */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    Availability
                  </span>

                  {product?.inStock === 1 ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      In stock
                      <FaCheck className="text-xs" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Out of stock
                      <FaXmark className="text-xs" />
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-slate-200" />

              {/* Quick information */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {manufacturer && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Manufacturer
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {manufacturer}
                    </p>
                  </div>
                )}

                {category && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {category}
                    </p>
                  </div>
                )}
              </div>

              {/* Product showcase message */}
              <div className="mt-6 rounded-2xl bg-brand/5 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Product details
                </p>

                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  Explore the specifications, description, and additional
                  information below.
                </p>
              </div>

              {/*
              ==========================================================
              Ecommerce functionality intentionally disabled.

              <button>
                Buy Now
              </button>

              <button>
                Add to Cart
              </button>

              <p>
                Fast Delivery
              </p>

              <p>
                Free Shipping
              </p>

              <p>
                Order Now
              </p>
              ==========================================================
              */}
            </div>
          </div>
        </section>

        {/* Product information tabs */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:mt-10">
          <ProductTabs product={product} />
        </section>
      </div>
    </main>
  );
};

export default SingleProductPage;
