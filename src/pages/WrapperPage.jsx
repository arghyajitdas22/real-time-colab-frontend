import React, { useEffect } from "react";
import TaskModal from "../components/project/task-manager/TaskModal";
import CreateModal from "../components/common/CreateModal";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const WrapperPage = () => {
  const navigate = useNavigate();
  const sessionAuth = async () => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      const options = {
        url: `http://localhost:8000/api/auth/session-auth`,
        method: "POST",
        data: { token },
      };

      try {
        const response = await axios.request(options);
        const msg = response.data.message;

        if (msg === "token active") {
          return;
        } else navigate("/auth");
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    navigate("/auth");
  };

  useEffect(() => {
    sessionAuth();
  }, []);

  return (
    <>
      <TaskModal />
      <CreateModal />
      <Outlet />
    </>
  );
};

export default WrapperPage;
