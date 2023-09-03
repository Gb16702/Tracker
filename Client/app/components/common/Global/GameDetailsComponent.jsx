"use client";

import PlayerSearchbar from "./PlayerSearchbar";
import Leaderboards from "./Leaderboards";
import Image from "next/image";
import { Ramabhadra } from "next/font/google";
import Link from "next/link";

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
});

const GameDetailsComponent = ({ game }) => {
  const topLeaderboard = game.players
    .sort((a, b) => b.division.elo - a.division.elo)
    .slice(0, 3);

  const gradientColor = (slug) => {
    if (slug === "league-of-legends") {
      return "from-[#F87A25] to-[#BA383B]";
    } else if (slug === "valorant") {
      return "from-[#ff4656b2] to-[#3d3ad9b9]";
    }
  };

  const getStarColorByRank = (rank) => {
    if (rank === 1) return "fill-yellow-300/[.8]";
    else if (rank === 2) return "fill-gray-300";
    else if (rank === 3) return "fill-yellow-600";
  };

  return (
    <>
      <div className="bg-[#0F141A] min-h-screen h-full flex flex-col">
        <div
          className={`h-[64vh] max-sm:h-[39vh] w-full bg-gradient-to-l relative z-10  ${gradientColor(
            game.slug
          )}`}
        >
          <div
            className={`relative h-[53vh] max-sm:h-[38vh] w-full rounded-bl-[200px] max-sm:rounded-none overflow-hidden`}
            style={{
              backgroundImage: `linear-gradient(to bottom,transparent,transparent 50%,rgba(0,0,0,.75)),linear-gradient(#0f141a80, #0f141a80), url(${game.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute w-full h-full opacity-35 flex items-center justify-center z-50">
              <div className="flex items-center max-w-[1400px] max-sm:w-full max-sm:justify-center w-full mt-10">
                <div className="w-[50%] max-sm:w-full h-[300px]">
                  <PlayerSearchbar
                    gameTitle={game.name}
                    numberOfPlayers={game.players.length}
                    players={game.players}
                    slug={game.slug}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col h-[calc(30vh-45px)] max-sm:h-[60vh] mt-3 max-sm:mt-0 gap-y-4">
          <div
            className={`max-w-[1400px] max-sm:max-w-[98%] w-full ${ramabhadra.className}`}
          >
            <h2 className="text-white font-medium text-lg max-sm:text-xl max-sm:mt-3">
              Meilleurs joueurs
            </h2>
            <h4 className="text-slate-500 text-sm">
              Les meilleurs joueurs de {game.name} sont listés ici
            </h4>
          </div>
          <div className=" flex items-center justify-between max-w-[1400px] w-full gap-x-3 max-sm:flex-col max-sm:gap-y-2">
            {topLeaderboard.map((player, index) => (
              <>
                <Link
                  href={`${game.slug}/${player._id}`}
                  className="w-[25%] h-[140px] max-sm:h-[110px] bg-[#0F1923] border border-[#1b2733] rounded-[4px] px-2 text-white font-medium py-2 relative max-sm:w-[98%]"
                >
                  <div className="flex flex-row gap-x-2">
                    <div className="p-2 bg-gradient-to-b from-[#0f141a] to-[#0F1923] border-t border-[#0F141A] rounded-full">
                      <Image
                        src={player.avatar}
                        alt={player.username}
                        width={40}
                        height={40}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center relative bottom-1">
                      <p>{player.username}</p>
                      <p
                        className={`text-[12px] text-[#94A5B9] ${ramabhadra.className}`}
                      >
                        {player.division.elo} ELO
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 w-[60px] h-[70px] bg-[#1b2733] rounded-bl-full flex items-center justify-center">
                    <h2 className={`font-semibold relative left-2 bottom-2`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className={`w-6 h-6 ${getStarColorByRank(index + 1)}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </h2>
                  </div>
                </Link>
              </>
            ))}
            <Link
              href={`${game.slug}/classement`}
              className="w-[25%] h-[140px] max-sm:w-[98%] max-sm:h-[110px] bg-[#1b2733] border border-[#1b2733] rounded-[4px] px-2 text-white font-medium py-2"
            >
              <div className="flex flex-row gap-x-1 items-center">
                <div className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-8 h-8 fill-white"
                  >
                    <path d="M4 17.333 6.133 20.8l2.134-3.467 4-1.067L9.6 13.2l.267-4.133L6 10.8 2.267 9.2l.4 4.133L0 16.533Zm3.733-5.2L7.6 14l1.2 1.333-1.733.4-.933 1.6-.934-1.467-1.733-.4 1.2-1.333-.267-2 1.733.667Zm12 4.133 4 1.067 2.133 3.6 2.134-3.6 4-.933-2.667-3.067.4-4.133-3.867 1.467-3.733-1.6.267 4.133Zm8.8-.933-1.733.4-.933 1.467-.933-1.6-1.733-.4 1.2-1.333L24.268 12l1.6.667L27.601 12l-.134 1.733Zm-16.266-1.867 3.733-1.6 3.733 1.6-.266-4.133 2.667-3.067-4-.933L16 1.733 13.867 5.2l-4 .933L12.534 9.2Zm4.666-6.533 1.733.4-1.2 1.333.134 1.734-1.6-.667-1.6.667.133-1.867-1.2-1.333 1.733-.4L16 5.333Zm-13.866 16.8v6.533h26v-6.533Zm24 4.667h-6.134v-2.8h6.133Zm-8 0h-6.134v-2.8h6.133Zm-8 0H4.933v-2.8h6.133ZM12 19.733h8V21.6h-8Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <p>Classement</p>
                  <p
                    className={`text-[12px] text-[#94A5B9] ${ramabhadra.className}`}
                  >
                    Clique
                    <span className=""> ici </span>
                    pour voir le classement général
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetailsComponent;
