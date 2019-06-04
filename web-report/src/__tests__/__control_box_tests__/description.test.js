import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Description } from "../../components/controlbox/Description.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Description", async () => {
  const { getByTestId } = render(
    <Description description="This is a test description." />
  );

  expect(getByTestId("description")).toHaveTextContent(
    "This is a test description."
  );
});
