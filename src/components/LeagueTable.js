import React, { useState, useEffect } from "react";

const url = "https://api-football-standings.azharimm.site/leagues/";

const LeagueTable = ({ season, id }) => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}${id}/standings?season=${season}`);
      if (!response.ok) {
        throw new Error(`Request Error ${response.text()}`);
      }

      const parsedData = await response.json();
      const { data } = parsedData;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h1>LeagueTable Component {season} </h1>;
};

export default LeagueTable;
