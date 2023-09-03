"use client"

import { useState } from "react";
import Search from "../Icons/HeroIcons/admin/Search";

const Searchbar = ({onChange, variant}) => {

const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    onChange(searchValue);
  };

    return <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-zinc-400" />
    </div>
    <input
        type="text"
        id="table-search-users"
        className={`block ${variant === "roles" ? "bg-zinc-900 w-full" : "bg-zinc-800 w-[320px]"} h-[43px] p-2 pl-10 text-sm text-zinc-400 rounded-lg  focus:ring-blue-500 focus:border-blue-500 placeholder-zinc-400`}
        placeholder="Rechercher des clients"
        value={search}
        onChange={handleInputChange}
        variant={variant}
    />
  </div>



}

export default Searchbar