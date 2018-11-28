import React from "react";
import { cleanup, render } from "react-testing-library";
import { ControlBox } from "../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

/*
link,
  id,
  status,
  name = "",
  description = "",
  timestamp = ""
*/

test("Control Box", async () => {
  const { getByTestId } = render(
    <ControlBox
      name="The Control"
      description="the description"
      id="S1"
      link={true}
      status={false}
    />
  );
  // debug();

  expect(getByTestId("control-box-title")).toHaveTextContent(
    "S1 - The Control"
  );

  expect(getByTestId("control-box-link")).toHaveAttribute(
    "href",
    "/controls/S1"
  );
});
