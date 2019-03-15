import React from "react";
import { cleanup, render } from "react-testing-library";
import { ControlComponent } from "../../components/controlbox/ControlComponent.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Control Component", async () => {
  const { getByTestId } = render(<ControlComponent component="Testing" />);

  expect(getByTestId("component")).toHaveTextContent("Component: Testing");
});
