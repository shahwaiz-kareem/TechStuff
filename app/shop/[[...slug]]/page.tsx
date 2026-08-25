export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  Breadcrumb,
  Filters,
  Pagination,
  Products,
  SortBy,
} from "@/components";
import React from "react";
import { sanitize } from "@/lib/sanitize";

// Improve readability of category text.
// Example: "smart-watches" -> "smart watches"
const improveCategoryText = (text: string): string => {
  if (text.indexOf("-") !== -1) {
    const textArray = text.split("-");

    return textArray.join(" ");
  }

  return text;
};

const ShopPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  // Await both params and searchParams
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-slate-5 text-black">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <Breadcrumb />

        <div className="pb-16 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">

            {/* Filters */}
            <aside className="min-w-0">
              <Filters />
            </aside>

            {/* Products */}
            <section className="min-w-0">
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                      Product collection
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                      {awaitedParams?.slug &&
                      awaitedParams?.slug[0]?.length > 0
                        ? sanitize(
                            improveCategoryText(
                              awaitedParams.slug[0]
                            )
                          )
                        : "All products"}
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Explore our collection of products and
                      discover the technology that fits your needs.
                    </p>
                  </div>

                  <SortBy />
                </div>
              </div>

              <Products
                params={awaitedParams}
                searchParams={awaitedSearchParams}
              />

              <Pagination />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
