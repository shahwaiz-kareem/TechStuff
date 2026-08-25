// *********************
// Role of the component: Fixed WhatsApp contact button
// Name of the component: WhatsAppButton.tsx
// Developer: Shahwaiz Karim
// Version: 1.0
// Component call: <WhatsAppButton />
// Input parameters: no input parameters
// Output: Fixed responsive WhatsApp contact button with prefilled message
// *********************

import React from "react";

const WhatsAppButton = () => {
  // Replace with your actual WhatsApp number.
  // Use international format without +, spaces, or dashes.
  const whatsappNumber = "38161123321";

  const message = encodeURIComponent(
    "Hello, I would like to know more about your products."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="
        fixed
        bottom-5
        right-5
        z-[100]
        flex
        h-14
        w-14
        items-center
        justify-center
        animate-pulse
        rounded-full
        bg-[#25D366]
        text-white
        shadow-lg
        shadow-green-500/25
        transition-all
        duration-300
        hover:scale-105
        hover:bg-[#20bd5a]
        hover:shadow-xl
        hover:shadow-green-500/30
        focus:outline-none
        focus:ring-4
        focus:ring-green-500/20
        sm:bottom-6
        sm:right-6
      "
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-current"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07.01C5.52-.03.16 5.27.13 11.82c-.01 2.08.54 4.11 1.59 5.9L.06 23.88l6.3-1.63a11.85 11.85 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.32 11.9-11.87a11.82 11.82 0 0 0-3.42-8.35Zm-8.45 18.2h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.97 1-3.64-.23-.37a9.86 9.86 0 0 1-1.52-5.24C2.2 6.34 6.65 1.95 12.08 1.95a9.82 9.82 0 0 1 6.99 2.9 9.84 9.84 0 0 1 2.89 7c-.02 5.44-4.45 9.83-9.89 9.83Zm5.42-7.36c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
