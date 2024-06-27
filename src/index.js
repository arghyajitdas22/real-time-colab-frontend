import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectTask from "./pages/ProjectTask";
import ProjectChat from "./pages/ProjectChat";
import ProjectChannels from "./pages/ProjectChannels";
import ProjectRepos from "./pages/ProjectRepos";
import Meetings from "./Meeting";
import { ChakraProvider } from "@chakra-ui/react";
import TaskModal from "./components/project/task-manager/TaskModal";
import CreateModal from "./components/common/CreateModal";
import Auth from "./pages/Auth";
import WrapperPage from "./pages/WrapperPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WrapperPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "projects/:teamId",
        element: <Projects />,
      },
      {
        path: "project/:projectId",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <ProjectTask />,
          },
          {
            path: "chat",
            element: <ProjectChat />,
          },
          {
            path: "repositories",
            element: <ProjectRepos />,
          },
          {
            path: "channels",
            element: <ProjectChannels />,
          },
          {
            path: "video",
            element: <Meetings />,
          },
        ],
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
