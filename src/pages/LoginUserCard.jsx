import React, { useState } from "react";
import InputBox from "../components/auth/Inputbox";
import BlueBtn from "../components/auth/BlueBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginUserCard = ({ handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const navigate = useNavigate();

  const InputBoxArray = [
    {
      type: "email",
      placeholder: "Enter email",
      setFunc: setEmail,
    },
    {
      type: "password",
      placeholder: "Enter password",
      setFunc: setPassword,
    },
  ];

  const onSubmit = async () => {
    const formData = {
      email,
      password,
    };

    const options = {
      method: "POST",
      url: 'http://localhost:8000/api/auth/login',
      data: formData,
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-full">
      <h1 className="text-2xl text-[#002d5d] font-semibold text-center">
        Welcome Back to CollabNest
      </h1>
      {InputBoxArray.map((item) => (
        <InputBox
          type={item.type}
          placeholder={item.placeholder}
          key={item.placeholder}
          setFunc={item.setFunc}
        />
      ))}
      <BlueBtn text={"Log In"} handleClick={onSubmit} disabled={isLoading} />
      <p className="w-full flex items-center justify-between text-[#546e7a] text-[14px] font-light">
        <span className="">Dont have an account?</span>
        <span onClick={handleClick} className="cursor-pointer">
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginUserCard;
