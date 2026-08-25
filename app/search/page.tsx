import { ProductItem, SectionTitle } from "@/components";
import apiClient from "@/lib/api";
import React from "react";
import { sanitize } from "@/lib/sanitize";

interface Props {
  searchParams: { search: string };
}

// sending api request for search results for a given search text
const SearchPage = async ({ searchParams }: Props) => {
  const sp = await searchParams;
  let products = [];

  try {
    const data = await apiClient.get(
      `/api/search?query=${sp?.search || ""}`
    );

    if (!data.ok) {
      console.error('Failed to fetch search results:', data.statusText);
      products = [];
    } else {
      const result = await data.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    products = [];
  }

  return (

      <div className="max-w-screen-2xl px-4 md:px-8 py-8 mx-auto ">
        {sp?.search && (
          <h3 className="text-3xl text-center py-4 max-sm:text-2xl">
            Showing results for {sanitize(sp?.search)}...
          </h3>
        )}
        <div className="grid grid-cols-4 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1 h-full">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem key={product.id} product={product}  />
            ))
          ) : (
            <h3 className="text-2xl mt-5 text-center w-full col-span-full h-full max-[1000px]:text-1xl max-[500px]:text-md">
              No results found for {sanitize(sp?.search)}
            </h3>
          )}
        </div>
      </div>

  );
};

export default SearchPage;

/*

*/
