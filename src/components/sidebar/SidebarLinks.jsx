import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLinks = ({ href, name, children, sideBarExpanded }) => {
  return (
    <NavLink
      end
      to={href}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-3 bg-blue-500 bg-opacity-35 rounded-md py-2 px-3 text-blue-500"
          : "flex items-center gap-3 bg-white hover:bg-gray-500 hover:bg-opacity-35 rounded-md py-2 px-3 basic-trans text-blue-950"
      }
    >
      {children}
      {sideBarExpanded && <span>{name}</span>}
    </NavLink>
  );
};

export default SidebarLinks;
