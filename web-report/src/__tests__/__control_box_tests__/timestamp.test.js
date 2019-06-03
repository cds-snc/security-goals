import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Timestamp } from "../../components/controlbox/Timestamp.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Timestamp", async () => {
  const { getByTestId } = render(<Timestamp timestamp="1000000:00pm" />);

  expect(getByTestId("control-box-timestamp")).toHaveTextContent(
    "1000000:00pm"
  );
});
