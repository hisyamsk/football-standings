import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const url = "https://api-football-standings.azharimm.site/leagues/";

const LeagueStanding = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState([]);
  const [year, setYear] = useState(2021);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}${id}/standings?season=${year}`);
      if (!response.ok) {
        const message = `An error occured: ${response.status}`;
        throw new Error(message);
      }
      const parsedData = await response.json();
      const { data } = parsedData;
      setStandings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  return (
    <div className="container justify-content-center">
      <h2 className="text-center my-4">{standings.name} Table</h2>
      <table className="table">
        <thead>
          <tr></tr>
        </thead>
      </table>
    </div>
  );
};

export default LeagueStanding;
