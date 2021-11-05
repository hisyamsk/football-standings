import React from "react";
import { Link } from "react-router-dom";

const League = ({ id, name, logos, light }) => {
  return (
    <div className="col-3 card m-2 shadow-sm" style={{ width: "16rem" }}>
      <img
        src={logos.light}
        alt={name}
        className="card-img-top border-bottom"
      />
      <div className="card-body text-center league-title">
        <h5>{name}</h5>
      </div>
      <div className="card-body text-center">
        <Link to={`leagues/${id}`}>
          <button className="btn btn-secondary">See Table</button>
        </Link>
      </div>
    </div>
  );
};

export default League;
