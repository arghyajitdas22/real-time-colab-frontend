import {
  ChatText,
  Files,
  PresentationChart,
  ProjectorScreenChart,
  UsersThree,
} from "@phosphor-icons/react";
import React from "react";
import SidebarLinks from "./SidebarLinks";
import { useParams } from "react-router-dom";

const Sidebar = ({ sideBarExpanded }) => {
  const { projectId } = useParams();
  const NAVLINKS = [
    {
      name: "Direct Messages",
      icon: <ChatText size={24} />,
      href: `/project/${projectId}/chat`,
    },
    {
      name: "Team Channels",
      icon: <UsersThree size={24} />,
      href: `/project/${projectId}/channels`,
    },
    {
      name: "Task Board",
      icon: <PresentationChart size={24} />,
      href: `/project/${projectId}`,
    },
    {
      name: "File System",
      icon: <Files size={24} />,
      href: `/project/${projectId}/repositories`,
    },
  ];
  return (
    <div
      className={`h-full ${
        sideBarExpanded ? "w-[250px] pt-6" : "w-16 pt-2"
      }  z-10 border-r-[3px] border-blue-600 sticky  flex flex-col gap-6`}
    >
      {sideBarExpanded && (
        <>
          <div className="flex items-center gap-3 pl-4 pr-2 relative">
            <ProjectorScreenChart size={32} />
            <div className="flex flex-col">
              <span className="font-semibold text-blue-950">ProjectName</span>
              <span className="text-[10px] text-gray-500">Team Name</span>
            </div>
          </div>
          <hr className="border-gray-300 mx-4" />
        </>
      )}

      <ul className="flex flex-col px-2 gap-1">
        {NAVLINKS.map((link, index) => (
          <li key={index}>
            <SidebarLinks
              href={link.href}
              name={link.name}
              sideBarExpanded={sideBarExpanded}
            >
              {link.icon}
            </SidebarLinks>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
