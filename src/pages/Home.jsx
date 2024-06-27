import React from "react";
import Teamlayout from "../components/teams/layouts/Team.layout";
import TeamsList from "../components/TeamsList";

const Home = () => {
  return (
    <Teamlayout>
      
      <h1>Will display the teams the user is in.</h1>
      <TeamsList />
    </Teamlayout>
  );
};

export default Home;
