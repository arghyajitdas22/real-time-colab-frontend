import { Bell, CaretUp, UserCircle } from "@phosphor-icons/react";
import React, { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import { NavLink, useParams } from "react-router-dom";
import useCreateModal from "../../hooks/useCreateModal";

const Header = () => {
  const open = useCreateModal((state) => state.open);
  const [showUserActions, setShowUserActions] = useState(false);
  const { teamId, projectId } = useParams();
  return (
    <header className="px-4 py-3 w-screen sticky top-0 border-b border-gray-300 shadow-sm flex items-center justify-between z-20">
      <div className="flex items-center gap-8">
        {/* logo and CollabNest */}
        <NavLink to={"/"} className="flex items-center gap-1">
          <div className="flex flex-col -space-y-2 text-blue-600">
            <CaretUp weight="bold" size={14} />
            <CaretUp weight="bold" size={14} />
            <CaretUp weight="fill" size={14} />
          </div>
          <span className="font-bold text-blue-950 text-xl">CollabNest</span>
        </NavLink>
        {/* your-projects and teams dropdowns */}
        <div className="flex items-center gap-4">
          <HeaderDropdown tag={"Teams"} />
          {(teamId || projectId) && <HeaderDropdown tag={"Team Projects"} />}
          <button
            type="button"
            className="p-2 text-white text-sm font-medium bg-blue-500 rounded-md"
            onClick={() => open()}
          >
            Create
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 relative">
        <Bell
          size={24}
          className=" cursor-pointer hover:scale-105 basic-trans"
        />
        <UserCircle
          size={24}
          className=" cursor-pointer hover:scale-105 basic-trans"
          onClick={() => setShowUserActions((prev) => !prev)}
        />
        {showUserActions && (
          <div
            className={`bg-white absolute top-7 right-0 z-30 border border-gray-300 rounded-md shadow-sm w-[300px] `}
          >
            User Actions
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
