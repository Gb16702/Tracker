"use client";

import React, { useState, useEffect } from "react";
import { SpecificPathname } from "../../../../../lib/SpecificPathname";
import style from "../../../../../styles/headerStyle.module.css";

const Header = ({ template, children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isSpecificPathname = SpecificPathname();

  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    backgroundColor: !isSpecificPathname
      ? isScrolled
        ? "#1E1E20"
        : "transparent"
      : "#0F141A",
    borderBottom: isScrolled ? "1px solid #222" : "1px solid transparent",
  };

  const headerClassName = `w-full h-[54px] flex justify-center z-50 ${
    !isSpecificPathname ? "fixed" : "bg-red-400"
  }`;

  return (
    <header
      className={`${headerClassName} ${
        template === "auth" ? style.secondaryHeader : style.mainHeader
      }`}
      style={headerStyle}
    >
      {children}
    </header>
  );
};

export default Header;
