import { CaretUp } from "@phosphor-icons/react";
import React, { useState } from "react";
import RegisterUserCard from "../components/auth/RegisterUserCard";
import LoginUserCard from "./LoginUserCard";

const Auth = () => {
  const [mode, setMode] = useState("register");
  const handleClick = () => {
    setMode((prev) => (prev === "register" ? "login" : "register"));
  };
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#fafafa] flex items-center justify-center">
      <div className=" bg-white rounded-md p-4 shadow-md flex flex-col items-center gap-6 w-[500px]">
        <div className="flex items-center gap-2">
          <div className="flex flex-col -space-y-3 text-blue-600">
            <CaretUp weight="bold" size={20} />
            <CaretUp weight="bold" size={20} />
            <CaretUp weight="fill" size={20} />
          </div>
          <span className="font-bold text-blue-950 text-3xl">CollabNest</span>
        </div>
        {mode === "register" ? (
          <RegisterUserCard handleClick={handleClick} />
        ) : (
          <LoginUserCard handleClick={handleClick} />
        )}
      </div>
    </div>
  );
};

export default Auth;
