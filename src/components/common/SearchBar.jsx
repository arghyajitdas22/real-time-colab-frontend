import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

const SearchBar = ({
  styles,
  placeholder,
  iconSize,
  iconStyles,
  val,
  handleSearch,
}) => {
  return (
    <div className={`relative flex items-center`}>
      <input
        type="text"
        className={`border border-[#7a869a] rounded-md ${styles} hover:bg-gray-500 hover:bg-opacity-10 basic-trans focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none z-10 bg-transparent`}
        placeholder={placeholder}
        value={val}
        onChange={handleSearch}
      />
      <MagnifyingGlass
        size={iconSize}
        weight="bold"
        className={`absolute ${iconStyles}`}
      />
    </div>
  );
};

export default SearchBar;
