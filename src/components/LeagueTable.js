import React, { useState, useEffect } from "react";

const url = "https://api-football-standings.azharimm.site/leagues/";

const LeagueTable = ({ season, id }) => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState([]);
  const [thead, setThead] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}${id}/standings?season=${season}`);
      if (!response.ok) {
        throw new Error(`Request Error ${response.text()}`);
      }
      const parsedData = await response.json();
      const { data } = parsedData;

      // let tempStandings = []
      // data.standings.map((club) => {
      //   club.stats.map((stat) => {
      //     const statDisplay = {
      //       MP: stat[3].value,
      //       W: stat[0].value,
      //       D: stat[2].value,
      //       L: stat[1].value,
      //       GF: stat[4].value,
      //       GA: stat[5].value,
      //       GD: stat[9].value,
      //       PTS: stat[6].value
      //     }
      //     return statDisplay;
      //   })
      //   const newStandings = {
      //     note: club.note,
      //     team: club.team,
      //     stats: statDisplay
      //   }
      //   tempStandings.push(newStandings);
      // })

      setStandings(data.standings);
      setThead(["Rank", "Club", "MP", "W", "D", "L", "GF", "GA", "GD", "PTS"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(season);
  }, [season]);

  return (
    <table className="table">
      <thead>
        <tr>
          {thead.map((item, index) => {
            return (
              <th scope="col" key={index}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {standings.map((club, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={club.team.logos[0].href}
                  alt={club.team.displayName}
                  className="me-2"
                  style={{ height: "1.7rem" }}
                />
                <span className="align-middle">
                  {window.innerWidth > 768
                    ? club.team.displayName
                    : club.team.abbreviation}
                </span>
              </td>
              <td>{club.stats[3].value}</td>
              <td>{club.stats[0].value}</td>
              <td>{club.stats[2].value}</td>
              <td>{club.stats[1].value}</td>
              <td>{club.stats[4].value}</td>
              <td>{club.stats[5].value}</td>
              <td>{club.stats[9].value}</td>
              <td>{club.stats[6].value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LeagueTable;
