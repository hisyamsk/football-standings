import React, { useState, useEffect } from "react";
import League from "./League";
import Loading from "./Loading";

const url = "https://api-football-standings.azharimm.site/leagues";

const LeagueList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      const { data } = parsedData;
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="row justify-content-center my-5">
      <h3 className="text-center my-3 ">Select league</h3>
      {teams.map((team) => {
        return <League key={team.id} {...team} />;
      })}
    </div>
  );
};

export default LeagueList;
