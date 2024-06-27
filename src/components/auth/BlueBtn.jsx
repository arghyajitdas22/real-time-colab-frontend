import React from "react";

const BlueBtn = ({ text, handleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="h-10 w-full rounded-sm bg-gradient-to-r from-[#546e7a] to-[#37474f] text-center text-white font-light hover:opacity-50 basic-trans"
    >
      {text}
    </button>
  );
};

export default BlueBtn;
