"use client";

import Link from "next/link";
import GetProfilePathname from "./GetProfilePathname";
import { useEffect, useState } from "react";

const ProfileMenu = ({ links, session }) => {
  const section = GetProfilePathname();
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const normalize = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  return (
    <>
      <nav
        className={`w-full h-[50px] bg-[#0F1923] sticky top-0 flex justify-center border-t border-[#1B2733] ${
          scroll > 50 && "border-b"
        }`}
      >
        <ul className="w-[1500px] h-full flex flex-row gap-x-4 max-md:w-fit">
          {links.map((l_, index) => (
            <li
              key={index}
              className={`h-full text-zinc-100 border-b-2 border-transparent text-sm font-medium flex items-center ${
                section === normalize(l_.name) && "border-vprimary"
              }`}
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}/${session?.slug}/${l_.path}`}
              >
                {l_.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ProfileMenu;
