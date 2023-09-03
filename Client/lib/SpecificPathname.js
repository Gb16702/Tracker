"use client";

import { usePathname } from "next/navigation";

export const SpecificPathname = () => {
  const pathname = usePathname();

  const newPathname = pathname.split("/");

  return newPathname.some((p_) => p_ === "profil");
};