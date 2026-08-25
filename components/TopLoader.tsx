"use client";

import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";

const TopLoader = () => {
  const [brandColor, setBrandColor] = useState("");
  useEffect(() => {
    const root = document.documentElement;
    const styles = window.getComputedStyle(root);
    const color = styles.getPropertyValue("--brand-color").trim();
    setBrandColor(color || "");
    console.log("Brand color:", color);
  }, []);
  return (
    <>
      <NextTopLoader color={`rgb(${brandColor})`} showSpinner={false} />
    </>
  );
};

export default TopLoader;
