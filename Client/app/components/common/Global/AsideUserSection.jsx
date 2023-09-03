"use client";

import Image from "next/image";

const AsideUserSection = ({ session }) => {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-[95px] flex p-1">
        <div className="w-full brightness-105 h-full rounded-md px-4 py-4 flex gap-x-3">
          {session?.avatar && (
            <Image
              src={session?.avatar}
              alt={`Image de profil de ${session?.username}`}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <h2 className="text-[17px] text-zinc-300 capitalize font-semibold tracking-tight ">
              {session?.username}
            </h2>
            <h3 className="text-[12px] text-emerald-400 font-sm tracking-tight ">
              {session?.email}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideUserSection;
