"use client";

import { Orbitron } from "next/font/google";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Close } from "../../Global/Icons/HeroIcons/Close";

const orbitron = Orbitron({
  weights: [400, 500, 600, 700, 800, 900],
  subsets: ["latin"],
});

const GameSectionHeader = ({ obj }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOpenPhoneMenu = () => {
    setOpen(true);
  };

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <header className="h-[45px] bg-[#0F141A] flex justify-between items-center pl-3 max-sm:pl-0 border-b border-[#1b2733]">
        <Link
          href="/"
          className={`text-white uppercase font-semibold text-[20px] max-sm:text-[18px] max-sm:px-2 px-3 border-r border-[#1b2733] h-full flex items-center ${orbitron.className}`}
        >
          Tracker.
        </Link>
        <nav className="w-full border-r border-[#1b2733] h-full flex items-center pl-4 max-sm:hidden">
          <ul className="flex gap-x-6 items-center h-full">
            {obj.map((o_, index) => (
              <li key={index}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_URL}/${o_.slug}`}
                  className="text-zinc-300 text-sm uppercase font-medium"
                >
                  {o_.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {open && (
          <div
            className="fixed z-50 w-full top-0 left-0 h-full bg-black/[.6] flex items-start py-[20%] justify-center backdrop-blur-[2px]"
            onClick={handleClick}
          >
            <div
              className="flex items-center flex-col justify-center w-[95%] bg-zinc-900 rounded-md border border-zinc-800"
              ref={ref}
            >
              <div className="text-zinc-200 fill-white flex flex-row items-center w-full px-2 justify-between py-2 border-b border-zinc-800">
                <h3 className="font-semibold">Menu</h3>
                <Close onClick={() => setOpen(false)} />
              </div>
              <ul className="flex flex-col gap-y-2 py-2 px-3 w-full">
                {obj.map((o_, index) => (
                  <li key={index}>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/${o_.slug}`}
                      className="text-zinc-300 text-sm uppercase font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {o_.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div
          className="sm:hidden w-[200px] h-full px-3"
          onClick={handleOpenPhoneMenu}
        >
          <span className="flex gap-x-2 items-center h-full justify-end font-semibold">
            <li className="inline text-sm text-[#DFE0D7]">Menu</li>
            <MdKeyboardArrowDown className="text-white inline" />
          </span>
        </div>
      </header>
    </>
  );
};

export default GameSectionHeader;
