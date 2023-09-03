"use client";

import Image from "next/image";
import { Rajdhani } from "next/font/google";
import Link from "next/link";

const rajdhani = Rajdhani({
  weight: "700",
  subsets: ["latin"],
});

const Leaderboards = ({ bestPlayers, slug }) => {
  const trimmedUsername = (username) => {
    if (username.length >= 14) {
      return username.slice(0, 13) + "...";
    } else {
      return username;
    }
  };

  return (
    <div className="leaderboards h-[75%] flex items-center justify-between gap-x-2 pl-[5%]">
      {bestPlayers.map((p_, index) => (
        <div className="w-1/3 h-full bg-[#263747] rounded-[5px] overflow-hidden" key={index}>
          <div className="flex items-end justify-center h-[35%]">
            <div className="bg-red-400 rounded-full p-2 bg-gradient-to-t from-[#263747] to-[#1b2733]">
              <Image
                src={p_.avatar}
                alt={`Image de profil de ${p_.username}`}
                width={48}
                height={48}
                className="rounded-full object-cover w-[55px] h-[55px]"
              />
            </div>
          </div>
          <div className="flex items-center flex-col h-[45%]">
            <h3 className="text-white font-semibold mt-1">
              {trimmedUsername(p_.username)}
            </h3>
            <h4 className="text-yellow-200 text-[12px] mt-2">
              Top {index + 1} ELO{" "}
            </h4>
            <h4
              className={`text-[30px] leading-[30px] text-white tracking-wide mt-1 ${rajdhani.className}`}
            >
              {p_.elo.toLocaleString()}{" "}
            </h4>
          </div>
          <Link
            href={`${slug}/classement`}
            className="flex flex-1  bg-slate-600 w-full h-[20%]  text-white items-center justify-center text-sm"
          >
            Classement
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Leaderboards;
