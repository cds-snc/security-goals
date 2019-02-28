import React from "react";
import { cleanup, render } from "react-testing-library";
import { ControlBox } from "../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Control Box", async () => {
  const { getByTestId } = render(
    <ControlBox
      description="the description"
      id="S1"
      title="S1 is the title"
      status="true"
      link={true}
      status={false}
    />
  );
  // debug();

  expect(getByTestId("control-box-title")).toHaveTextContent("S1 is the title");

  expect(getByTestId("control-box-link")).toHaveAttribute(
    "href",
    "/controls/S1"
  );
});
