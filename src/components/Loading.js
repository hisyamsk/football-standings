import React from "react";

const Loading = () => {
  return (
    <div className="d-flex align-items-center flex-column">
      <div className="my-5">
        <div
          className="spinner-border text-secondary"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden text-center">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
