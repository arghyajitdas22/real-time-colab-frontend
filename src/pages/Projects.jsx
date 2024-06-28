import React, { useEffect } from "react";
import Teamlayout from "../components/teams/layouts/Team.layout";
import { useParams } from "react-router-dom";
const Projects = () => {
  const { teamId } = useParams();
  useEffect(() => {
    localStorage.setItem("teamId", teamId);
  }, [teamId]);

  return (
    <Teamlayout>
      <h1>Will display the projects that the user is assigned in that team.</h1>
    </Teamlayout>
  );
};

export default Projects;
