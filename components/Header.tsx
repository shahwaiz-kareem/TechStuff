// *********************
// Role of the component: Minimal sticky main header
// Name of the component: Header.tsx
// Developer: Shahwaiz Karim
// Version: 3.2
// Component call: <Header />
// Input parameters: no input parameters
// Output: Minimal responsive sticky header with 3 navigation links
// *********************

"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  FaBars,
  FaChevronDown,
  FaRegUser,
  FaXmark,
} from "react-icons/fa6";

import SearchInput from "./SearchInput";
import HeartElement from "./HeartElement";

import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import apiClient from "@/lib/api";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const { wishlist, setWishlist, wishQuantity } =
    useWishlistStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  const handleLogout = () => {
    setAccountOpen(false);
    setMobileMenuOpen(false);

    toast.success("Logout successful!");

    setTimeout(() => {
      signOut();
    }, 700);
  };

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

      /*
       * Temporarily disabled while wishlist issue is being resolved.
       */
      return;

      wishlistData.map((item: any) =>
        productArray.push({
          id: item?.product?.id,
          title: item?.product?.title,
          price: item?.product?.price,
          image: item?.product?.mainImage,
          slug: item?.product?.slug,
          stockAvailabillity: item?.product?.inStock,
        })
      );

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
  }, [session?.user?.email, wishlist.length]);

  // ========================================
  // ADMIN HEADER
  // ========================================
  if (isAdmin) {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" >
            <Image
              src="/logo.png"
              width={250}
              height={250}
              alt=" logo"
              className="h-auto w-36 sm:w-16"
              priority
            />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((prev) => !prev)}
              aria-expanded={accountOpen}
              className="flex items-center gap-2 rounded-full border border-slate-200 p-1 transition hover:bg-slate-50"
            >
              <Image
                src="/randomuser.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />

              <FaChevronDown
                className={`mr-2 text-[10px] text-slate-400 transition-transform ${
                  accountOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                <Link
                  href="/admin"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // ========================================
  // STOREFRONT HEADER
  // ========================================
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Singitronic home"
            className="shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              width={250}
              height={250}
              alt="Singitronic logo"
              className="h-auto w-[45px] sm:w-[75px]"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-8">
              {/* Home */}
              <Link
                href="/"
                className={`group relative pb-1 text-[13px] font-medium transition-colors ${
                  pathname === "/"
                    ? "text-brand"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Home

                {pathname === "/" && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />
                )}
              </Link>

              {/* Products */}
              <Link
                href="/shop"
                className={`group relative pb-1 text-[13px] font-medium transition-colors ${
                  pathname.startsWith("/shop")
                    ? "text-brand"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Products

                {pathname.startsWith("/shop") && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />
                )}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`group relative pb-1 text-[13px] font-medium transition-colors ${
                  pathname.startsWith("/contact")
                    ? "text-brand"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Contact

                {pathname.startsWith("/contact") && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />
                )}
              </Link>
            </div>
          </nav>

          {/* Right side */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5">
            {/* Search */}
            <div className="hidden w-[180px] sm:block xl:w-[210px]">
              <SearchInput />
            </div>

            {/* Login / Account */}
            {!session ? (
              <Link
                href="/login"
                aria-label="Log in"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
              >
                <FaRegUser className="text-sm" />
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  aria-expanded={accountOpen}
                  aria-label="Open account menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                >
                  <FaRegUser className="text-sm" />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    <div className="border-b border-slate-100 px-3 py-2.5">
                      <p className="text-[11px] text-slate-400">
                        Signed in as
                      </p>

                      <p className="mt-0.5 truncate text-sm font-medium text-slate-800">
                        {session.user?.email}
                      </p>
                    </div>

                    <Link
                      href="/"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      My account
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            <HeartElement wishQuantity={wishQuantity} />

            {/*
            Product showcase website:
            Cart intentionally disabled.

            <CartElement />
            */}

            {/* Mobile menu */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand lg:hidden"
            >
              {mobileMenuOpen ? (
                <FaXmark className="text-sm" />
              ) : (
                <FaBars className="text-sm" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="border-t border-slate-100 px-1 py-2.5 sm:hidden">
          <SearchInput />
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white py-3 lg:hidden">
            <nav className="flex flex-col">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`relative rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === "/"
                    ? "bg-brand/5 text-brand"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={`relative rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname.startsWith("/shop")
                    ? "bg-brand/5 text-brand"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Products
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`relative rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname.startsWith("/contact")
                    ? "bg-brand/5 text-brand"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Contact
              </Link>

              {!session && (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 border-t border-slate-100 px-3 pt-3 text-sm font-semibold text-brand"
                >
                  Log in
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
