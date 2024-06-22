import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectTask from "./pages/ProjectTask";
import ProjectChat from "./pages/ProjectChat";
import ProjectChannels from "./pages/ProjectChannels";
import ProjectRepos from "./pages/ProjectRepos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
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
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
