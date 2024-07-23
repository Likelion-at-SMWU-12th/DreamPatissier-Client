import React from "react";

const ProgressBar = ({ current, total }) => (
  <div>
    <span>{`${current} / ${total}`}</span>
    <div
      style={{
        width: `${(current / total) * 100}%`,
        height: "10px",
        backgroundColor: "var(--yellow)",
        borderRadius: "5px",
      }}
    ></div>
  </div>
);

export default ProgressBar;
