import { CaretDown, CaretUp } from "@phosphor-icons/react";
import React, { useState } from "react";

const HeaderDropdown = ({ tag }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <button
      onClick={() => setShowDropdown((prev) => !prev)}
      className="flex items-center gap-1 relative"
    >
      <span className="font-medium">{tag}</span>
      {showDropdown ? (
        <CaretUp size={12} weight="bold" />
      ) : (
        <CaretDown size={12} weight="bold" />
      )}
      {showDropdown && (
        <div
          className={`bg-white absolute top-7 left-0 z-30 border border-gray-300 rounded-md shadow-sm w-[300px]`}
        >
          This is where drop contents will be displayed
        </div>
      )}
    </button>
  );
};

export default HeaderDropdown;
