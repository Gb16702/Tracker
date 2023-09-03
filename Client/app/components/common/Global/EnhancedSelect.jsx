"use client";

import { useState } from 'react';
import Cross from './Icons/HeroIcons/admin/Cross';

const EnhancedSelect = ({options, onChange, onDelete}) => {
    const   [isOpen, setIsOpen] = useState(false),
            [selectedOptions, setSelectedOptions] = useState([]);

            const handleOptionClick = (option) => {
                const newSelectedOptions = [...selectedOptions, option];
                setSelectedOptions(newSelectedOptions);
                onChange(newSelectedOptions);
                setIsOpen(false);
              };

              const handleTagRemove = (tag) => {
                const newSelectedOptions = selectedOptions.filter(
                  (selectedOption) => selectedOption !== tag
                );
                setSelectedOptions(newSelectedOptions);
                onDelete(newSelectedOptions);
              };

  const colors = options.map((option) => option.color);

  return (
    <div className="relative">
      <button
        type="button"
        className=" mt-2 w-full bg-zinc-900 rounded-md py-2 px-4 inline-flex items-center justify-between h-[46px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-zinc-400 text-sm'>Sélectionnez une option</span>
        <svg
          className={`${
            isOpen ? 'transform rotate-180' : ''
          } w-5 h-5 ml-2 -mr-1 fill-zinc-400`}
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-zinc-900 shadow-lg overflow-hidden">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm hover:bg-vprimary hover:text-zinc-100 cursor-pointer text-zinc-400 transition duration-200"
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='flex flex-row gap-x-2 mt-2'>
        {selectedOptions.map((option, index) => (
          <span key={option._id} style={{border:"1px solid", color:colors[index], borderColor: colors[index]}}  className={`rounded-md flex w-fit px-2 py-1 gap-x-2 text-sm bg-zinc-900`}>
            {option}
            <button onClick={() => handleTagRemove(option)}>
                <Cross className="w-4 h-4"/>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default EnhancedSelect