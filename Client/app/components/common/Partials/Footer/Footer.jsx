"use client";

import React from "react";
import FooterNavigation from "./Top/FooterNavigation";
import { SpecificPathname } from "../../../../../lib/SpecificPathname";

const Footer = () => {
  const isSpecificPathname = SpecificPathname();

  return (
    <footer
      className={`h-[20vh] max-md:h-[15vh] bg-zinc-900 flex justify-center border-t border-zinc-800 ${
        isSpecificPathname ? "hidden" : null
      }`}
    >
      <div className=" max-w-[60%] w-[100%] max-md:max-w-[95%] max-md:text-sm">
        <FooterNavigation />
        <div className="border-zinc-800 py-6 max-md:py-4 flex justify-center flex-row items-center border-t">
          <h3 className="text-zinc-400 text-[13px]">
            Copyright 2023. Tous droits réservés
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
