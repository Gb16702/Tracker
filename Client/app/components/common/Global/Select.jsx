"use client";

import { useState } from "react";
import Cross from "./Icons/HeroIcons/admin/Cross";

const Select = ({ options, placeholder, className, onChange, onReset }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleReset = () => {
    setSelectedValue("");
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="relative w-full">
      {selectedValue && (
        <Cross
          onClick={handleReset}
          className="w-[16px] z-50 h-[16px] absolute right-6 top-1/2 -translate-y-1/2 stroke-zinc-400 cursor-pointer"
        />
      )}
      <select
        value={selectedValue}
        onChange={handleChange}
        className={className}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
