"use client";

import React, { useState } from "react";
import { timeSince } from "../../../../../lib/timeSince";
import { usePathname } from "next/navigation";
import { ActionButton } from "./ActionButton";
import TestimonialsCard from "../TestimonialsCard";

const TestimonialsRow = ({ onSelect, selectedStatus, ...testimonial }) => {
  const [isSelected, setIsSelected] = useState(false),
    [focused, setFocused] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onSelect(testimonial.title, !isSelected);
  };

  return (
    <>
      {focused && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] "></div>
          <TestimonialsCard testimonial={testimonial} setFocused={setFocused} isAdmin />
        </>
      )}
      <tr
        className={`align-top border-t border-zinc-800 ${isSelected && "bg-zinc-800"}`}
      >
        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
          <div className="flex items-center justify-start gap-x-5">
            <div className="flex flex-col">
              <h3>{testimonial.username ?? "Anonyme"}</h3>
            </div>
          </div>
        </th>
        <td className="px-6 py-4">{testimonial.title}</td>
        <td className="px-6 py-4">{testimonial.rating}</td>
        <td className="px-6 py-4">
          {timeSince(new Date(testimonial.createdAt))}
        </td>
        <td className="px-6 py-4">
          {testimonial.isVisible == false ? "Non" : "Oui"}
        </td>
        <td className="px-6 py-4">
          <ActionButton
            isPublished={testimonial.isVisible}
            testimonialIdentifier={testimonial._id}
            select={handleSelect}
            isSelected={isSelected}
            selectedStatus={selectedStatus}
            setFocused={setFocused}
          />
        </td>
      </tr>
    </>
  );
};

const AllTestimonials = ({ head, testimonials }) => {
  const [selectedStatus, isSelectedStatus] = useState([]);

  const pathname = usePathname();
  const lastSection = pathname.split("/administration/")[1];

  const handleSelect = (name, isSelected) => {
    if (isSelected) isSelectedStatus([...selectedStatus, name]);
    else isSelectedStatus(selectedStatus.filter((s) => s !== name));
  };

  const item = "testimonials";

  return (
    <>
      <div className="h-[70px] flex items-end justify-between"></div>
      <>
        <section className="w-full rounded-md bg-adminBgAlt overflow-hidden">
          <table className="w-full h-full text-sm text-left">
            <thead className="text-xs uppercase bg-zinc-800">
              <tr className="text-zinc-100">
                {head.map((item, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 font-medium tracking-wider"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-adminBgAlt text-zinc-100">
              {testimonials.map((testimonial, index) => (
                <TestimonialsRow
                  key={index}
                  {...testimonial}
                  onSelect={handleSelect}
                  selectedStatus={selectedStatus}
                />
              ))}
            </tbody>
          </table>
        </section>
        <div className="w-full flex justify-end gap-x-2">
        {/* {testimonials && (
            <>
              {selectedStatus.length >= 1 && (
                <DeleteStatus selectedStatus={selectedStatus} item={item} />
              )}
            </>
          )} */}
        </div>
      </>
    </>
  );
};

export default AllTestimonials;
