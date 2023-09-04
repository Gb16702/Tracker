"use client";

import {
  ArrowLeft,
  ArrowRight,
} from "../../common/Global/Icons/HeroIcons/ArrowPagination";
import TestimonialsCard from "../../common/Global/TestimonialsCard";

import { useEffect, useRef, useState } from "react";

const Testimonials = ({ testimonials }) => {
  const leftArrow = useRef(null),
    rightArrow = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    console.log(userAgent);

    if (mobileRegex.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const [startIndex, setStartIndex] = useState(0),
    [lastClicked, setLastClicked] = useState(null);

  const testimonialsPerSlide = isMobile ? 1 : 3;
  const maxIndex = testimonials.length - testimonialsPerSlide;

  const handleClick = (e) => {
    if (e.currentTarget === leftArrow.current) {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setLastClicked("left");
    } else if (e.currentTarget === rightArrow.current) {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, testimonials.length - testimonialsPerSlide)
      );
      setLastClicked("right");
    }
  };

  const isStartDisabled = startIndex === 0;
  const isEndDisabled = startIndex === maxIndex;

  return (
    <div className="bg-[#1E1E20] h-[60vh] max-md:h-[50vh] w-full flex flex-row items-center justify-center mt-[100px]">
      <div className="flex flex-col w-full">
        <h2 className="text-[26px] text-white tracking-tight font-medium uppercase">
          Ils nous font
          <span className="text-vprimary"> confiance</span>
        </h2>
        <div className="flex flex-row gap-x-3 mt-5">
          {testimonials
            .slice(startIndex, startIndex + testimonialsPerSlide)
            .map((t_, i) => (
              <TestimonialsCard key={i} testimonial={t_} />
            ))}
        </div>
        <div className="flex flex-row justify-end mt-5 gap-x-2">
          <button
            className={`text-[17px] tracking-tight w-[40px] h-[40px] bg-black/[.4] rounded-[8px] flex items-center justify-center ${
              isStartDisabled && "opacity-[60%]"
            } `}
            onClick={handleClick}
            ref={leftArrow}
            disabled={isStartDisabled}
          >
            <ArrowLeft className="w-5 h-5 stroke-vprimary" />
          </button>
          <button
            className={`text-[17px] tracking-tight w-[40px] h-[40px] bg-black/[.4] rounded-[8px] flex items-center justify-center ${
              isEndDisabled && "opacity-[60%]"
            }`}
            onClick={handleClick}
            ref={rightArrow}
            disabled={isEndDisabled}
          >
            <ArrowRight className="w-5 h-5 stroke-vprimary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
