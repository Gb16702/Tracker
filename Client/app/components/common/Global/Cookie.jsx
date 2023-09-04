"use client";

import { useEffect, useState } from "react";
import { Close } from "./Icons/HeroIcons/Close";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Cookie = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(true);
    setVisible(false);
  };

  const handleAccept = () => {
    Cookies.set("acceptCookies", true, { expires: 365 });
    router.refresh();
    setOpen(false);
    setVisible(false);
  };

  useEffect(() => {
    const acceptCookies = Cookies.get("acceptCookies");
    setVisible(!acceptCookies);
  }, []);

  return (
    <>
      {open && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] "></div>
          <div className="fixed z-[100] top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800 max-sm:w-[97%]">
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Cookies Essentiels
              </h3>
              <Close
                className="text-xl cursor-pointer fill-zinc-100"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="mt-7">
              <p className="text-zinc-200 text-sm mt-3">
                <span className="text-white font-medium"></span>
                Ces cookies vous permettent de naviguer sur le site, d'accéder à
                des zones sécurisées et d'utiliser ses fonctionnalités de base.
              </p>
              <br />
              <button
                className=" cursor-pointer px-4 text-zinc-200 text-[13px] bg-vprimary rounded-md h-[38px] w-[40%] mt-2 max-sm:w-full"
                onClick={handleAccept}
              >
                Accepter
              </button>
            </div>
          </div>
        </>
      )}
      <div
        className={`fixed z-[999] bottom-6 min-w-[40%] max-sm:min-w-[30%] max-w-[500px] min-h-[80px] bg-zinc-900 border border-zinc-800 border-l-transparent rounded-r-md left-0 px-3 flex items-center flex-row gap-x-4 ${
          visible ? "visible" : "hidden"
        }`}
      >
        <span class="inline-flex p-2 rounded-lg shrink-0 bg-vprimary/[.15]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-vprimary"
          >
            <path d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z"></path>
          </svg>
        </span>
        <div className="flex flex-row">
          <h2 className="text-[13px] text-zinc-200 ">
            Nous utilisons des cookies pour assurer le bon fonctionnement du
            site. &nbsp;
            <span
              className="text-vprimary underline cursor-pointer"
              onClick={handleClick}
            >
              Voir notre politique
            </span>
          </h2>
        </div>
        <button
          className=" cursor-pointer px-4 text-zinc-200 text-[13px] bg-zinc-800 rounded-md h-[38px]"
          onClick={handleAccept}
        >
          Accepter
        </button>
      </div>
    </>
  );
};

export default Cookie;
