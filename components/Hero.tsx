// *********************
// Role of the component: Modern product showcase hero component
// Name of the component: Hero.tsx
// Developer: Shahwaiz Karim
// Version: 3.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Responsive hero matching the provided reference design
// *********************

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaArrowRight,
  FaPlay,
} from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="bg-white px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <div
          className="
            relative
            min-h-[540px]
            overflow-hidden
            rounded-[28px]
            bg-slate-950
            px-6
            py-12
            sm:min-h-[580px]
            sm:px-10
            sm:py-14
            md:rounded-[32px]
            md:px-14
            lg:min-h-[620px]
            lg:px-16
            xl:px-20
          "
        >
          {/* ==========================================
              Decorative curved lines
          ========================================== */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-20
            "
            aria-hidden="true"
          >
            <div className="absolute -left-[25%] -top-[80%] h-[170%] w-[95%] rotate-[18deg] rounded-[50%] border border-slate-700" />
            <div className="absolute -left-[28%] -top-[72%] h-[160%] w-[95%] rotate-[18deg] rounded-[50%] border border-slate-700" />
            <div className="absolute -left-[32%] -top-[65%] h-[150%] w-[95%] rotate-[18deg] rounded-[50%] border border-slate-700" />
            <div className="absolute -right-[35%] -bottom-[80%] h-[160%] w-[90%] rotate-[18deg] rounded-[50%] border border-slate-800" />
          </div>

          {/* ==========================================
              Blue decorative circles
          ========================================== */}
          <div
            className="
              pointer-events-none
              absolute
              right-[23%]
              top-[23%]
              h-20
              w-20
              rounded-full
              bg-brand
              opacity-90
              sm:h-24
              sm:w-24
              lg:h-28
              lg:w-28
            "
            aria-hidden="true"
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[9%]
              bottom-[13%]
              h-28
              w-28
              rounded-full
              bg-brand
              opacity-95
              sm:h-36
              sm:w-36
              lg:h-44
              lg:w-44
            "
            aria-hidden="true"
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[31%]
              bottom-[25%]
              h-10
              w-10
              rounded-full
              bg-brand/90
              sm:h-14
              sm:w-14
            "
            aria-hidden="true"
          />

          {/* ==========================================
              Content
          ========================================== */}
          <div className="relative z-20 grid h-full min-h-[440px] items-center lg:grid-cols-[0.95fr_1.05fr]">
            {/* Left content */}
            <div className="max-w-xl">
              {/* Small label */}
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-500 sm:text-xs">
                  Featured collection
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  max-w-[620px]
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                Discover
                <span className="text-blue-500"> Better Devices </span>
                at a Better Price.
              </h1>

              {/* Description */}
              <p
                className="
                  mt-5
                  max-w-lg
                  text-sm
                  leading-6
                  text-slate-300
                  sm:mt-6
                  sm:text-base
                  sm:leading-7
                "
              >
                Explore modern electronics, smart devices, and everyday
                technology. Browse our collection and discover products
                designed for the way you live.
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">
                <Link
                  href="/shop"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-brand
                    px-6
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-brand/20
                    transition-all
                    duration-200
                    hover:bg-brand/90
                    hover:shadow-xl
                    hover:shadow-brand/20
                  "
                >
                  Explore Products
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    <FaArrowRight className="text-[10px]" />
                  </span>
                </Link>

                {/* <button
                  type="button"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    text-sm
                    font-medium
                    text-slate-300
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-slate-950
                      shadow-md
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  >
                    <FaPlay className="ml-0.5 text-xs" />
                  </span>

                  Watch Promotion
                </button> */}

                {/*
                  Product showcase website:
                  Ecommerce purchasing actions intentionally disabled.

                  <button>
                    Buy Now
                  </button>

                  <button>
                    Order Now
                  </button>

                  <p>
                    Fast Delivery
                  </p>
                */}
              </div>
            </div>

            {/* ==========================================
                Product visual
            ========================================== */}
            <div className="relative mt-10 flex min-h-[330px] items-center justify-center lg:mt-0 lg:min-h-[500px]">
              {/* Main product */}
              <div
                className="
                  relative
                  z-10
                  flex
                  w-full
                  items-center
                  justify-center
                "
              >
                <Image
                  src="/hero-product.png"
                  width={620}
                  height={620}
                  priority
                  alt="Featured product"
                  sizes="
                    (max-width: 640px) 75vw,
                    (max-width: 1024px) 60vw,
                    45vw
                  "
                  className="
                    h-auto
                    w-[72%]
                    max-w-[500px]
                    object-contain
                    drop-shadow-[0_30px_35px_rgba(0,0,0,0.35)]
                    transition-transform
                    duration-500
                    ease-out
                    hover:scale-[1.03]
                    sm:w-[65%]
                    lg:w-[78%]
                    xl:w-[82%]
                  "
                />
              </div>

              {/* Floating product information */}
              <div
                className="
                  absolute
                  bottom-[8%]
                  right-[2%]
                  z-30
                  hidden
                  w-[180px]
                  rounded-2xl
                  bg-white
                  p-3
                  shadow-[0_15px_35px_rgba(0,0,0,0.18)]
                  sm:block
                  sm:w-[200px]
                  lg:right-[3%]
                "
              >
                <div className="flex items-center gap-3">
                  {/* <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src="/hero-product.png"
                      width={60}
                      height={60}
                      alt="Featured product"
                      className="h-10 w-10 object-contain"
                    />
                  </div> */}

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-950">
                      Featured Product
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Explore product details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              Mobile bottom glow
          ========================================== */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              left-1/2
              h-40
              w-72
              -translate-x-1/2
              rounded-full
              bg-brand/20
              blur-3xl
              lg:hidden
            "
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
