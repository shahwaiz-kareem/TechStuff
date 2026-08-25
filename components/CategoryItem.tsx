// *********************
// Role of the component: Category item styled like the provided reference design
// Name of the component: CategoryItem.tsx
// Developer: Shahwaiz Karim
// Version: 4.0
// Component call: <CategoryItem title={title} src={src} href={href} />
// Input parameters: CategoryItemProps interface
// Output: Modern circular category image with pill-shaped label
// *********************

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryItemProps {
  title: string;
  src: string;
  href: string;
}

const CategoryItem = ({
  title,
  src,
  href,
}: CategoryItemProps) => {
  return (
    <Link
      href={href}
      className="group flex w-full flex-col items-center focus:outline-none"
    >
      {/* Circular image */}
      <div
        className="
          relative
          flex
          h-[150px]
          w-[150px]
          items-center
          justify-center
          rounded-full
          bg-[#eef6ff]
          transition-transform
          duration-300
          ease-out
          group-hover:-translate-y-1
          sm:h-[165px]
          sm:w-[165px]
          md:h-[175px]
          md:w-[175px]
          lg:h-[185px]
          lg:w-[185px]
        "
      >
        <Image
          src={src}
          alt={title}
          width={512}
          height={512}
          sizes="185px"
          className="
            h-[78%]
            w-[78%]
            object-contain
            transition-transform
            duration-300
            ease-out
            group-hover:scale-105
          "
        />
      </div>

      {/* Category title pill */}
      <div
        className="
          relative
          z-10
          -mt-1
          flex
          min-h-[54px]
          w-[86%]
          items-center
          justify-center
          rounded-full
          bg-white
          px-4
          py-3
          text-center
          shadow-[0_8px_22px_rgba(15,23,42,0.08)]
          transition-all
          duration-300
          group-hover:-translate-y-1
          group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]
        "
      >
        <h3
          className="
            text-sm
            font-semibold
            tracking-tight
            text-slate-900
            transition-colors
            duration-200
            group-hover:text-brand
            sm:text-[15px]
          "
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
