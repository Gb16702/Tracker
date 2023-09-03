"use client";

import { Ramabhadra } from "next/font/google";
import GameLogos from "./Icons/GameLogos/GameLogos";
import GlobalSearchBar from "./GlobalSearchbar";

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
});

const PlayerSearchbar = ({ gameTitle, numberOfPlayers, players, slug }) => {
  return (
    <>
      <div className="pr-[15%] max-sm:p-0 max-sm:flex max-sm:justify-center max-sm:flex-col max-sm:items-center max-sm:h-full">
        <div className="flex flex-row items-center gap-x-3">
          <div className="max-sm:hidden">
            <GameLogos game={gameTitle} />
          </div>
          <div className="max-sm:flex max-sm:items-center max-sm:flex-col">
            <h1
              className={`text-white uppercase text-[33px] leading-9 font-semibold ${ramabhadra.className} tracking-wide max-sm:text-[29px]`}
            >
              {gameTitle} stats
            </h1>
            <h2 className="text-[#94A5B9] max-sm:text-[16px] max-sm:text-center max-sm:pt-3">
              Suis les statistiques et classements de {gameTitle}
            </h2>
          </div>
        </div>
        <GlobalSearchBar trackerSection users={players} gameSlug={slug} />
        <div className="w-full flex justify-start">
          <h3 className="mt-6 max-sm:mt-12 text-white text-lg max-sm:text-center max-sm:w-full">
            Joueurs traqués : &nbsp;
            <span className="font-semibold ">{numberOfPlayers} </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default PlayerSearchbar;
