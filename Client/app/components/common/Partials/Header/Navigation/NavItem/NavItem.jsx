"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const NavItem = ({ text, link, isLogo = false, className }) => {
  const path = usePathname();

  return (
    <span className={` h-full flex items-center relative`}>
      <Link
        href={link}
        className={`text-[15px] ${
          isLogo
            ? `text-white font-bold ${orbitron.className}`
            : path == link
            ? "text-white font-medium"
            : "text-[#DFE0D7]"
        }`}
      >
        {text}
      </Link>
      <span
        className={`bottom-0 w-full h-[2px] rounded-full max-sm:hidden ${
          path == link && !isLogo ? "bg-vprimary" : ""
        } absolute left-0`}
      ></span>
    </span>
  );
};

export default NavItem;
