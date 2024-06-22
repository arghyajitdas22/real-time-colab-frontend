import React, { useState } from "react";
import Header from "../../header/Header";
import Sidebar from "../../sidebar/Sidebar";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";

const Projectlayout = ({ children }) => {
  const [expandSidebar, setExpandSidebar] = useState(true);

  return (
    <div className="w-full relative bg-white">
      {/* header */}
      <Header />
      {/* sidebar */}
      <div className="flex w-full relative h-[calc(100vh-62px)]">
        <Sidebar sideBarExpanded={!expandSidebar} />
        {expandSidebar ? (
          <CaretCircleRight
            size={32}
            weight="fill"
            className="text-blue-950 absolute top-6 left-[47px] z-20 bg-white cursor-pointer rounded-full p-0"
            onClick={() => setExpandSidebar((prev) => !prev)}
          />
        ) : (
          <CaretCircleLeft
            size={32}
            weight="fill"
            className="text-blue-950 absolute top-6 left-[233px] z-20 bg-white cursor-pointer rounded-full p-0"
            onClick={() => setExpandSidebar((prev) => !prev)}
          />
        )}

        {children}
      </div>
    </div>
  );
};

export default Projectlayout;
