import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      className="container my-5 shadow align-middle p-3"
      style={{ minHeight: "500px" }}
    >
      <h1 className="text-center mt-5">Page not found</h1>
      <div className="text-center">
        <Link to="/">
          <button className="btn btn-lg btn-secondary my-3">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
