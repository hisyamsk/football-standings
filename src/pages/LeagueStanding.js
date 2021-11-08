import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import LeagueTable from "../components/LeagueTable";

const url = "https://api-football-standings.azharimm.site/leagues";

const LeagueStanding = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [seasons, setSeasons] = useState([]);
  const [leagueName, setLeagueName] = useState("");
  const [year, setYear] = useState(2021);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/${id}/seasons`);
      const parsedData = await response.json();
      const { data } = parsedData;

      let tempSeasons = [];
      data.seasons.map((season) => tempSeasons.push(season.year));

      setSeasons(tempSeasons);
      setLeagueName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container shadow border my-5 ">
      <section className="upper-section my-3 text-center">
        <h1 className="my-4">{leagueName} Table</h1>
        <h3 className="my-2">Select Seasons</h3>
        <div className="d-flex justify-content-center">
          <select
            className="form-select form-select-lg my-3"
            style={{ maxWidth: "500px" }}
            onChange={(e) => setYear(e.target.value)}
            defaultValue={year}
          >
            {seasons.map((season, index) => {
              return (
                <option value={season} key={index}>
                  {season}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section className="my-5">
        <LeagueTable season={year} id={id} />
      </section>
    </div>
  );
};

export default LeagueStanding;
