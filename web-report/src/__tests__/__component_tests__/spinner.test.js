import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Spinner } from "../../components/Spinner.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Spinner", async () => {
  const { getByTestId } = render(<Spinner />);

  expect(getByTestId("spinner")).toHaveAttribute(
    "aria-label",
    "The component is loading..."
  );
});
