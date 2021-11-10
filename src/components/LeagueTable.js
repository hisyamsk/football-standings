import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import Loading from "./Loading";

const url = "https://api-football-standings.azharimm.site/leagues/";
const imgAlt =
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=100&h=100";

const useWindowSize = () => {
  const [smallSize, setSmallSize] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setSmallSize(true);
      } else {
        setSmallSize(false);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return smallSize;
};

const LeagueTable = ({ season, id }) => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState([]);
  const smallSize = useWindowSize();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${url}${id}/standings?season=${season}`);
      if (!response.ok) {
        throw new Error(`Request Error ${response.text()}`);
      }
      const parsedData = await response.json();
      const { data } = parsedData;

      setStandings(data.standings);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [season, id]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [season, id, fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <table className="table overflow-auto">
      <thead>
        <tr>
          <th scope="col">Club</th>
          <th scope="col">MP</th>
          <th scope="col">W</th>
          <th scope="col">D</th>
          <th scope="col">L</th>
          {!smallSize && (
            <>
              <th scope="col">GF</th>
              <th scope="col">GA</th>
              <th scope="col">GD</th>
            </>
          )}
          <th scope="col">PTS</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((club, index) => {
          return (
            <tr key={index}>
              <th scope="row" className="fw-normal">
                <span
                  className="align-middle me-1 rank"
                  style={{
                    minWidth: "19px",
                    display: "inline-block",
                  }}
                >
                  {index + 1}
                </span>
                <img
                  src={club.team.logos ? club.team.logos[0].href : imgAlt}
                  alt={club.team.displayName}
                  className="ps-2 me-2 club-img"
                  style={{
                    height: "1.7rem",
                    borderLeft: club.note
                      ? `3px solid ${club.note.color}`
                      : "3px solid white",
                  }}
                />
                <span className="align-middle">
                  {!smallSize ? club.team.displayName : club.team.abbreviation}
                </span>
              </th>
              <td>{club.stats[3].value}</td>
              <td>{club.stats[0].value}</td>
              <td>{club.stats[2].value}</td>
              <td>{club.stats[1].value}</td>
              {!smallSize && (
                <>
                  <td>{club.stats[4].value}</td>
                  <td>{club.stats[5].value}</td>
                  <td>{club.stats[9].value}</td>
                </>
              )}
              <td>{club.stats[6].value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LeagueTable;
