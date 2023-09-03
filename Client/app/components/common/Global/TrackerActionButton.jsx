"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const TrackerActionButton = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          className="fixed bg-[#0F1923] py-2 w-[175px] rounded-md border border-[#1b2733] px-2 z-50 text-sm"
        >
          <Link href={"http://localhost:3000/" + url} className="text-zinc-200">
            Voir le profil
          </Link>
        </div>
      )}
      <button
        onClick={handleClick}
        className="tracking-[.2em] pt-[2px] pb-1 px-1 rounded-md relative flex items-center justify-center"
      >
        <span className="w-fit h-fit relative bottom-[2px] left-[1px]">
          ...
        </span>
      </button>
    </>
  );
};

export default TrackerActionButton;
