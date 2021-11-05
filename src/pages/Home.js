import React from "react";
import LeagueList from "../components/LeagueList";

const Home = () => {
  return (
    <div className="container justify-content-center">
      <h1 className="mt-5 text-center">Football League Standings</h1>
      <LeagueList />
    </div>
  );
};

export default Home;
