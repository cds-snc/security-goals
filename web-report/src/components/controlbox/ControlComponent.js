/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

export const ControlComponent = ({ component }) => {
  if (!component) return null;
  return (
    <p data-testid="component" name="component">
      <strong>Component:</strong> {component}
    </p>
  );
};
