import React from "react";
import Teamlayout from "../components/teams/layouts/Team.layout";
import Sidebar from "../components/sidebar/Sidebar";
const Projects = () => {
  return (
    <Teamlayout>
      <Sidebar />
      <h1>Will display the projects that the user is assigned in that team.</h1>
    </Teamlayout>
  );
};

export default Projects;
