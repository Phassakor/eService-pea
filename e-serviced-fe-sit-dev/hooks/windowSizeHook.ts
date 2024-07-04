"use client";
import { useState, useEffect } from "react";

export const useScreenWidth = () => {
  const isWindowDefined = typeof window !== "undefined";
  const [width, setWidth] = useState(() =>
    isWindowDefined ? window.innerWidth : 0
  );
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    if (isWindowDefined) {
      window.addEventListener("resize", updateWidth);
    }

    return () => {
      if (isWindowDefined) {
        window.removeEventListener("resize", updateWidth);
      }
    };
  }, []);

  return width;
};
