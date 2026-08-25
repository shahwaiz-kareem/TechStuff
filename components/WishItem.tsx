// *********************
// Role of the component: Wishlist product card
// Name of the component: WishItem.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <WishItem />
// Input parameters: wishlist product information
// Output: Modern responsive wishlist product card
// *********************

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaXmark } from "react-icons/fa6";

interface WishItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
  onRemove?: (id: string) => void;
}

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
  onRemove,
}: WishItemProps) => {
  const productImage = image
    ? `/${image}`
    : "/product_placeholder.jpg";

  const inStock = stockAvailabillity === 1;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      {/* Remove */}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${title} from wishlist`}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <FaXmark className="text-xs" />
        </button>
      )}

      {/* Image */}
      <Link
        href={`/product/${slug}`}
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-slate-50 p-7"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/5 blur-2xl transition-all duration-500 group-hover:bg-brand/10" />

        <Image
          src={productImage}
          width={600}
          height={600}
          alt={title}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Availability */}
        <div className="mb-2">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Out of stock
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${slug}`}>
          <h2 className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 tracking-tight text-slate-900 transition-colors duration-200 hover:text-brand">
            {title}
          </h2>
        </Link>

        {/* Price */}
        <p className="mt-3 text-lg font-bold tracking-tight text-slate-950">
          ${price}
        </p>

        <div className="flex-1" />

        {/* View product */}
        <Link
          href={`/product/${slug}`}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white"
        >
          View product
          <FaArrowRight className="text-[10px]" />
        </Link>

        {/*
          Product showcasing website:
          Ecommerce purchasing functionality intentionally disabled.

          <button>
            Add to cart
          </button>

          <button>
            Buy now
          </button>
        */}
      </div>
    </article>
  );
};

export default WishItem;
