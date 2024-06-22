import React from "react";
import Header from "../../header/Header";

const Teamlayout = ({ children }) => {
  return (
    <div className="w-full relative bg-white">
      <Header />
      <div className=" w-full relative h-[calc(100vh-62px)]">{children}</div>
    </div>
  );
};

export default Teamlayout;
