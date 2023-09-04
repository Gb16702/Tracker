"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowBottom } from "../../common/Global/Icons/HeroIcons/admin/ArrowsForMenu";
import {
  ArrowLeft,
  ArrowRight,
} from "../../common/Global/Icons/HeroIcons/ArrowPagination";

const GameSlide = ({ games }) => {
  const [sortBy, setSortBy] = useState("Popularité");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);

  const leftArrow = useRef(null),
    rightArrow = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSortChange = (option) => {
    setSortBy(option);
    toggleDropdown();
  };

  const [isMobile, setIsMobile] = useState(false);

  const gamesPerSlide = isMobile ? 2 : 5;

  const [startIndex, setStartIndex] = useState(0),
  [lastClicked, setLastClicked] = useState(null);

  const gamesToShow = games.slice(startIndex, startIndex + gamesPerSlide);

  const sortedGamesToShow = [...gamesToShow];

  if (sortBy === "Popularité") {
    sortedGamesToShow.sort((a, b) => b.popularity - a.popularity);
  } else if (sortBy === "Nom") {
    sortedGamesToShow.sort((a, b) => a.name.localeCompare(b.name));
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    if (mobileRegex.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);



  const maxIndex = games.length - gamesPerSlide;

  const handleClick = (e) => {
    if (e.currentTarget === leftArrow.current) {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setLastClicked("left");
    } else if (e.currentTarget === rightArrow.current) {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, games.length - gamesPerSlide)
      );
      setLastClicked("right");
    }
  };

  const isStartDisabled = startIndex === 0;
  const isEndDisabled = startIndex === maxIndex;

  return (
    <section className="h-[50vh] flex items-center sm:w-full">
      <div className="max-sm:px-5">
        <div className="flex flex-row gap-x-7 items-center max-sm:flex-col max-sm:w-full max-sm:justify-start max-sm:items-start">
          <h2 className="text-[26px] text-white tracking-tight font-medium uppercase">
            Espace
            <span className="text-vprimary"> de jeux</span>
          </h2>
          <div className="relative w-[280px]" ref={ref}>
            <button
              onClick={toggleDropdown}
              className="rounded-md text-gray-400 flex items-center gap-x-1 relative top-[1px]"
            >
              Tri par {sortBy === "Popularité" ? "Popularité" : sortBy}
              <ArrowBottom className="w-5 h-5 fill-zinc-300 stroke-none relative top-[1px]" />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-zinc-800 py-3 flex flex-col items-start rounded-md absolute left-0 w-full z-50 text-zinc-300 gap-y-3 text-sm">
                <div className="w-full px-4 relative group hover:bg-vprimary/[.15]">
                  <span className="group-hover:bg-vprimary absolute h-full w-[2px] bg-transparent left-0 top-0"></span>
                  <p
                    onClick={() => handleSortChange("Popularité")}
                    className="cursor-pointer w-full py-3"
                  >
                    Tri par Popularité
                  </p>
                </div>
                <div className="w-full px-4 relative group hover:bg-vprimary/[.15]">
                  <span className="group-hover:bg-vprimary absolute h-full w-[2px] bg-transparent left-0 top-0"></span>
                  <p
                    onClick={() => handleSortChange("Nom")}
                    className="cursor-pointer w-full py-3"
                  >
                    Tri par Nom
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-x-6 mt-6">
            {sortedGamesToShow.map((g_, index) => (
              <Link href={`${g_.slug}`} key={index} className="">
                {g_.image && (
                  <Image
                    src={g_.image}
                    alt={g_.name}
                    width={1000}
                    height={1000}
                    className="w-[190px] h-[250px] object-cover rounded-md hover:brightness-110 min-w-[170px] max-sm:h-[230px]"
                  />
                )}
                <h2 className="text-[15px] text-white font-medium mt-2">
                  {g_.name}
                </h2>
              </Link>
            ))}
          </div>
          {isMobile ||
            (games.length > gamesPerSlide && (
              <div className="flex flex-row justify-end mt-5 gap-x-2">
                <button
                  className={`text-[17px] tracking-tight w-[40px] h-[40px] bg-black/[.4] rounded-[8px] flex items-center justify-center  `}
                  onClick={handleClick}
                  ref={leftArrow}
                  disabled={isStartDisabled}
                >
                  <ArrowLeft className="w-5 h-5 stroke-vprimary" />
                </button>
                <button
                  className={`text-[17px] tracking-tight w-[40px] h-[40px] bg-black/[.4] rounded-[8px] flex items-center justify-center`}
                  ref={rightArrow}
                  onClick={handleClick}
                  disabled={isEndDisabled}
                >
                  <ArrowRight className="w-5 h-5 stroke-vprimary" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GameSlide;
