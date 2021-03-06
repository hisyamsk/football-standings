import React from "react";
import LeagueList from "../components/LeagueList";

const Home = () => {
  return (
    <div className="container justify-content-center my-5 border shadow">
      <h1 className="mt-5 text-center">Football League Standings</h1>
      <LeagueList />
    </div>
  );
};

export default Home;
