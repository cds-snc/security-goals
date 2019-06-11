
import React from "react";

export const BackIcon = ({ fill = "#FFF" }) => {
  return (
    <svg
      title="Back"
      width="8"
      height="8"
      style={{
        display: "inline-block",
        transform: "scale(-2, 2)",
        translate: "(0px, -1px)",
        marginRight: "5px",
        fill: fill
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9.42 15.62"
      aria-hidden="true"
    >
      <g>
        <path d="M6.63,7.81,1,.5H3.17L8.79,7.81,3.17,15.12H1.05Z" />
        <path d="M3.42,15.62H0L6,7.81,0,0H3.42l6,7.81Zm-1.36-1h.87L8.16,7.81,2.93,1H2L7.26,7.81Z" />
      </g>
    </svg>
  );
};
