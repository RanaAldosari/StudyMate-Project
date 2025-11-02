import React from "react";
import { LuSearch } from "react-icons/lu";

function Searchbar({ value, onChange, placeholder = "Search courses..." }) {
  return (
    <div className="relative">

      <input
        aria-label="Search courses"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-12 rounded-lg
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          pl-12 pr-4 text-sm
          placeholder:text-gray-500 dark:placeholder:text-gray-500
          text-slate-800 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
          transition"/>

<span
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          inline-flex w-7 h-7 items-center justify-center
          rounded-full">
        <LuSearch className="w-10 h-5 text-gray-500 dark:text-slate-300" />
      </span>
    </div>
  );
}

export default Searchbar;
