import React, { useState } from "react";
import InputBox from "./Inputbox";
import BlueBtn from "./BlueBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUserCard = ({ handleClick }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const InputBoxArray = [
    {
      type: "text",
      placeholder: "Enter First Name",
      setFunc: setFirstName,
    },
    {
      type: "text",
      placeholder: "Enter Last Name",
      setFunc: setlastName,
    },
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
    try {
      setIsLoading(true);
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };

      const options = {
        method: "POST",
        url: `http://localhost:8000/api/auth/register`,
        data,
      };

      const res = await axios.request(options);
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log(res.data);
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
        Welcome to CollabNest
      </h1>
      {InputBoxArray.map((item) => (
        <InputBox
          type={item.type}
          placeholder={item.placeholder}
          key={item.placeholder}
          setFunc={item.setFunc}
        />
      ))}
      <BlueBtn text={"Sign Up"} handleClick={onSubmit} disabled={isLoading} />
      <p className="w-full flex items-center justify-between text-[#546e7a] text-[14px] font-light">
        <span className="">Alredy have an account?</span>
        <span onClick={handleClick} className="cursor-pointer">
          Log In
        </span>
      </p>
    </div>
  );
};

export default RegisterUserCard;
