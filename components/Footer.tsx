// *********************
// Role of the component: Thin horizontal product showcase footer
// Name of the component: Footer.tsx
// Developer: Shahwaiz Karim
// Version: 3.2
// Component call: <Footer />
// Input parameters: no input parameters
// Output: Simple, minimal, responsive horizontal footer
// *********************

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const CopyrightPara = () => {
  "use client";

  return (
    <p className="text-xs text-slate-400 sm:text-sm">
      © {new Date().getFullYear()} Singitronic. All rights reserved.
    </p>
  );
};

const Footer = () => {
  return (
    <footer
      className="border-t border-slate-200 bg-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-screen-2xl px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <Link href="/" aria-label="Singitronic home">
            <Image
              src="/logo.png"
              alt="Singitronic logo"
              width={250}
              height={250}
              className="h-auto w-36 sm:w-12"
            />
          </Link>

          {/* Copyright */}
          <CopyrightPara />

          {/* Links + social */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-slate-400 transition-colors hover:text-brand sm:text-sm"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-slate-400 transition-colors hover:text-brand sm:text-sm"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="text-xs text-slate-400 transition-colors hover:text-brand sm:text-sm"
            >
              Contact
            </Link>

            <span className="hidden h-4 w-px bg-slate-200 sm:block" />

            <a
              href="#"
              aria-label="Facebook"
              className="text-slate-400 transition-colors hover:text-brand"
            >
              <FaFacebookF className="text-xs" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="text-slate-400 transition-colors hover:text-brand"
            >
              <FaInstagram className="text-xs" />
            </a>

            <a
              href="#"
              aria-label="X"
              className="text-slate-400 transition-colors hover:text-brand"
            >
              <FaXTwitter className="text-xs" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="text-slate-400 transition-colors hover:text-brand"
            >
              <FaLinkedinIn className="text-xs" />
            </a>
          </div>
        </div>

        {/*
        Navigation intentionally kept commented.

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          ...
        </div>
        */}
      </div>
    </footer>
  );
};

export default Footer;
