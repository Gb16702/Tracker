"use client";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Title = () => {
  return (
    <>
      <h1 className="bg-transparent text-[52px] text-center text-[#E8E8E8] relative z-30 max-lg:text-[38px]">
        <span
          className={`font-semibold ${orbitron.className} max-md:text-[45px]`}
        >
          TRACKER.
        </span>
        <br />
        <span className="relative whitespace-nowrap max-lg:whitespace-normal">
          <span
            className={`relative text-[36px] ${orbitron.className} font-normal w-full max-lg:text-[28px] max-sm:text-[23px]`}
          >
            Le compagnon ultime pour suivre vos performances
          </span>
        </span>{" "}
        <br />
      </h1>
      <p
        className={`text-xl pt-7 text-zinc-200/50 relative text-[20px] text-center leading-8 z-10 max-lg:text-lg `}
      >
        Explorez vos statistiques comme jamais auparavant !
      </p>
    </>
  );
};

export default Title;
