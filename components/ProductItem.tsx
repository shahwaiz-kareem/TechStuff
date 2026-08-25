// *********************
// Role of the component: Modern product showcase card
// Name of the component: ProductItem.tsx
// Developer: Shahwaiz Karim
// Version: 2.2
// Component call: <ProductItem product={product} />
// Input parameters: { product: Product }
// Output: Product showcase card with WhatsApp inquiry action
// *********************

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

import { sanitize } from "@/lib/sanitize";

const ProductItem = ({
  product,
}: {
  product: Product;
}) => {
  const title = sanitize(product?.title) || "Product";

  const image = product?.mainImage
    ? `/${product.mainImage}`
    : "/product_placeholder.jpg";

  const manufacturer = product?.manufacturer
    ? sanitize(product.manufacturer)
    : "Unknown manufacturer";

  const category = product?.category?.name
    ? sanitize(product.category.name).replace(/-/g, " ")
    : "";

  const rating = Math.max(
    0,
    Math.min(5, Number(product?.rating) || 0)
  );

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in this product:\n\n` +
      `Product: ${title}\n` +
      `Manufacturer: ${manufacturer}\n\n` +
      `Please provide more information.`
  );

  // Replace this with the actual WhatsApp number.
  // Include country code without +, spaces or hyphens.
  const whatsappNumber = "38161123321";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-brand/20
        hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]
      "
    >
      {/* Product image */}
      <Link
        href={`/product/${product.slug}`}
        className="
          relative
          flex
          aspect-square
          items-center
          justify-center
          overflow-hidden
          bg-slate-50
          p-6
          sm:p-8
        "
        aria-label={`View ${title}`}
      >
        {/* Soft brand glow */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-15%]
            top-[-15%]
            h-40
            w-40
            rounded-full
            bg-brand/5
            blur-2xl
            transition-all
            duration-500
            group-hover:bg-brand/10
          "
          aria-hidden="true"
        />

        <Image
          src={image}
          width={600}
          height={600}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="
            relative
            z-10
            h-full
            w-full
            object-contain
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
          alt={title}
        />

        {/* Hover label */}
        <span
          className="
            absolute
            bottom-4
            left-1/2
            z-20
            -translate-x-1/2
            translate-y-3
            rounded-full
            bg-white/95
            px-4
            py-2
            text-xs
            font-semibold
            text-slate-700
            opacity-0
            shadow-lg
            backdrop-blur
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          View details
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category */}
        {category && (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand/70">
            {category}
          </p>
        )}

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3
            className="
              line-clamp-2
              min-h-[48px]
              text-base
              font-semibold
              leading-6
              tracking-tight
              text-slate-900
              transition-colors
              duration-200
              hover:text-brand
              sm:text-lg
            "
          >
            {title}
          </h3>
        </Link>

        {/* Manufacturer */}
        <p className="mt-2 text-xs text-slate-500 sm:text-sm">
          By{" "}
          <span className="font-medium text-slate-700">
            {manufacturer}
          </span>
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-[11px]">
            {Array.from({ length: 5 }).map((_, index) =>
              index < rating ? (
                <FaStar
                  key={index}
                  className="text-amber-400"
                />
              ) : (
                <FaRegStar
                  key={index}
                  className="text-slate-300"
                />
              )
            )}
          </div>

          <span className="text-xs font-medium text-slate-500">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-xl font-bold tracking-tight text-slate-950">
            ${product.price}
          </span>
        </div>

        <div className="flex-1" />

        {/* WhatsApp inquiry */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-5
            flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-xl
            bg-brand
            px-4
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-brand/90
            hover:shadow-lg
            hover:shadow-green-500/20
            focus:outline-none
            focus:ring-4
            focus:ring-green-500/20
          "
        >
          {/* WhatsApp SVG */}
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
            aria-hidden="true"
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07.01C5.52-.03.16 5.27.13 11.82c-.01 2.08.54 4.11 1.59 5.9L.06 23.88l6.3-1.63a11.85 11.85 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.32 11.9-11.87a11.82 11.82 0 0 0-3.42-8.35Zm-8.45 18.2h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.97 1-3.64-.23-.37a9.86 9.86 0 0 1-1.52-5.24C2.2 6.34 6.65 1.95 12.08 1.95a9.82 9.82 0 0 1 6.99 2.9 9.84 9.84 0 0 1 2.89 7c-.02 5.44-4.45 9.83-9.89 9.83Zm5.42-7.36c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
          </svg>

          Ask about this product
        </a>

        {/*
        Product showcasing website:
        Ecommerce purchasing/order functionality intentionally disabled.

        <button>
          Buy now
        </button>

        <button>
          Add to cart
        </button>

        <p>
          Fast delivery
        </p>

        <p>
          Free shipping
        </p>
        */}
      </div>
    </article>
  );
};

export default ProductItem;
