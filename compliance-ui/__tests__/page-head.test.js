import React from "react";
import { cleanup, render } from "react-testing-library";
import { PageHead } from "../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("PageHead", async () => {
  const { getByTestId } = render(<PageHead title="Page Title" />);
  expect(getByTestId("title")).toHaveAttribute("data-title", "Page Title");
});
