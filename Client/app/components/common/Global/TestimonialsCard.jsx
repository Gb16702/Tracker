"use client";

import { timeSince } from "../../../../lib/timeSince";
import { Close } from "./Icons/HeroIcons/Close";

const TestimonialsCard = ({ testimonial, setFocused, isAdmin }) => {
  let shadowColor;
  shadowColor = "border-[1.5px] border-zinc-800";
  return isAdmin ? (
    <section
      className={`bg-adminBgAlt px-3 py-4 min-h-[240px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-lg flex flex-col justify-between ${shadowColor}`}
    >
      <div className="flex flex-row items-center justify-between h-[40px]">
        <h1 className="font-medium text-lg text-zinc-200">
          {testimonial.title}
        </h1>
        <Close
          className="text-xl cursor-pointer fill-zinc-100"
          onClick={() => setFocused(false)}
        />
      </div>
      <p className="flex flex-1 py-3 text-zinc-300 text-[13.5px]">
        {testimonial.content}
      </p>
      <small className="text-zinc-300">{`${
        testimonial.username ?? "Utilisateur anonyme"
      }. Il y a ${timeSince(new Date(testimonial.createdAt))}`}</small>
    </section>
  ) : (
    <>
      <section
        className={`bg-[#18181B] px-4 py-3 min-h-[250px] w-full rounded-lg flex flex-col justify-between ${shadowColor}`}
      >
        <div className="h-[40px]">
          <h1 className="font-medium text-lg text-zinc-200">
            {testimonial.title}
          </h1>
        </div>
        <p className="flex flex-1 py-3 text-zinc-300 text-[13.5px]">
          {testimonial.content}
        </p>
        <small className="text-zinc-400">{`${
          testimonial.username ?? "Utilisateur anonyme"
        }`}</small>
      </section>
    </>
  );
};

export default TestimonialsCard;
