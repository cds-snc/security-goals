import React from "react";

export const Description = ({ description }) => {
  return (
    <p name="desc" data-testid="description">
      {description}
    </p>
  );
};
