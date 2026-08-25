"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import WishItem from "@/components/WishItem";
import apiClient from "@/lib/api";

export const WishlistModule = () => {
  const { data: session } = useSession();
  const { wishlist, setWishlist } = useWishlistStore();

  const getWishlistByUserId = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/wishlist/${id}`, {
        cache: "no-store",
      });

      const wishlistData = await response.json();

      const productArray: {
        id: string;
        title: string;
        price: number;
        image: string;
        slug: string;
        stockAvailabillity: number;
      }[] = [];

      wishlistData.map((item: any) => {
        productArray.push({
          id: item?.product?.id,
          title: item?.product?.title,
          price: item?.product?.price,
          image: item?.product?.mainImage,
          slug: item?.product?.slug,
          stockAvailabillity: item?.product?.inStock,
        });
      });

      setWishlist(productArray);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const getUserByEmail = async () => {
    if (!session?.user?.email) return;

    try {
      const response = await apiClient.get(
        `/api/users/email/${session.user.email}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (data?.id) {
        getWishlistByUserId(data.id);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  const removeFromWishlist = (id: string) => {
    setWishlist(
      wishlist.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Saved products
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Your Wishlist
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Keep track of products you would like to explore later.
          </p>
        </div>

        {/* Empty state */}
        {!wishlist || wishlist.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <span className="text-2xl">♡</span>
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                Your wishlist is empty
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Products you save will appear here for easy access later.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((item) => (
              <WishItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                slug={item.slug}
                stockAvailabillity={item.stockAvailabillity}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
