// *********************
// Role of the component: Interactive product image gallery
// Name of the component: ProductGallery.tsx
// Developer: Shahwaiz Karim
// Version: 1.0
// Component call: <ProductGallery />
// Input parameters: productTitle, mainImage, images
// Output: Responsive product image gallery with selectable thumbnails
// *********************

"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

interface ProductGalleryProps {
  productTitle: string;
  mainImage?: string;
  images: ImageItem[];
}

const ProductGallery = ({
  productTitle,
  mainImage,
  images,
}: ProductGalleryProps) => {
  const galleryImages = useMemo(() => {
    const result: string[] = [];

    if (mainImage) {
      result.push(`/${mainImage}`);
    } else {
      result.push("/product_placeholder.jpg");
    }

    images.forEach((item) => {
      if (item?.image) {
        const imagePath = `/${item.image}`;

        if (!result.includes(imagePath)) {
          result.push(imagePath);
        }
      }
    });

    return result;
  }, [mainImage, images]);

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        className="
          relative
          flex
          aspect-square
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
        "
      >

        <Image
          src={galleryImages[activeImage]}
          alt={`${productTitle} image ${activeImage + 1}`}
          width={800}
          height={800}
          priority={activeImage === 0}
          sizes="
            (max-width: 640px) 85vw,
            (max-width: 1024px) 65vw,
            50vw
          "
          className="
            relative
            z-10
            h-full
            w-full
            object-cover
            transition-all
            duration-300

          "
        />
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {galleryImages.map((image, index) => {
              const isActive = activeImage === index;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={isActive}
                  className={`
                    relative
                    aspect-square
                    overflow-hidden
                    rounded-xl
                    bg-white
                    p-2
                    transition-all
                    duration-200
                    focus:outline-none
                    focus:ring-4
                    focus:ring-brand/10
                    ${
                      isActive
                        ? "border-2 border-brand shadow-sm"
                        : "border border-slate-200 hover:border-brand/30"
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt={`${productTitle} thumbnail ${index + 1}`}
                    width={160}
                    height={160}
                    sizes="120px"
                    className="h-full w-full object-contain rounded-xl"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
