"use client";

import { MdKeyboardArrowDown } from "react-icons/md";
import { Discord } from "../../../Global/Icons/BrandLogos/Discord";
import Github from "../../../Global/Icons/BrandLogos/Github";
import Profile from "../../../Global/Profile";
import NavItem from "./NavItem/NavItem";
import { useState, useEffect, useRef } from "react";
import { Close } from "../../../Global/Icons/HeroIcons/Close";
import LogoutButton from "../../../Global/LogoutButton";

const Nav = ({ session }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOpenPhoneMenu = () => {
    setOpen(true);
  };

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  }

  return (
    <nav
      className="w-[1500px] bg-transparent h-full flex flex-row justify-between max-sm:w-full max-sm:px-3"
      session={session}
    >
      <ul className="w-[300px] h-full flex items-center">
        <li className="rounded-full">
          <NavItem link="/" isLogo={true} text="TRACKER." />
        </li>
      </ul>
      <ul className="max-sm:hidden w-[440px] h-full flex items-center">
        <li className="pr-7 flex h-full relative gap-x-5">
          <NavItem link="/" text="Accueil" />
          <NavItem link="/contact" text="Contact" />
          {session ? (
            <Profile />
          ) : (
            <NavItem link="/connexion" text="Connexion" />
          )}
          <span className="absolute right-0 bg-zinc-600 h-[50%] translate-y-1/2 w-[1px]"></span>
        </li>
        <li className="flex flex-row pl-5 h-[24px] items-center gap-1">
          <Discord />
          <Github />
        </li>
      </ul>
      {open && (
        <div className="fixed z-50 w-full top-0 left-0 h-full bg-black/[.6] flex items-start py-[20%] justify-center backdrop-blur-[2px]" onClick={handleClick}>
          <div className="flex items-center flex-col justify-center w-[95%] bg-zinc-900 rounded-md border border-zinc-800" ref={ref}>
            <div className="text-zinc-200 fill-white flex flex-row items-center w-full px-2 justify-between py-2 border-b border-zinc-800">
              <h3 className="font-semibold">Menu</h3>
              <Close onClick={() => setOpen(false)} />
            </div>
            <ul className="flex gap-y-2 py-2 px-3 w-full">
              <li className="pr-7 flex h-full relative gap-x-5 flex-col gap-y-2">
                <NavItem link="/" text="Accueil" />
                <NavItem link="/contact" text="Contact" />
                {session ? (
                  <>
                    <NavItem
                      link={`/${session?.user?.slug}/profil/dashboard`}
                      text="Mon compte"
                    />
                    {session?.roles.grade <= 2 && (
                      <NavItem
                        link="/administration/dashboard"
                        text="Administration"
                      />
                    )}
                    <LogoutButton className="flex justify-start hover:opacity-70 transition-all duration-300 relative text-zinc-300" />
                  </>
                ) : (
                  <>
                    <NavItem link="/connexion" text="Connexion" />
                    <NavItem link="/inscription" text="Inscription" />
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div
        className="sm:hidden w-[200px] h-full px-0"
        onClick={handleOpenPhoneMenu}
      >
        <span className="flex gap-x-2 items-center h-full justify-end font-semibold">
          <li className="inline text-sm text-[#DFE0D7]">Menu</li>
          <MdKeyboardArrowDown className="text-white inline" />
        </span>
      </div>
    </nav>
  );
};

export default Nav;
