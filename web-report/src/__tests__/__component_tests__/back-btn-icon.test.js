import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BackIcon } from "../../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Back Icon", async () => {
  const { getByTitle } = render(<BackIcon />);
  expect(getByTitle("Back")).toHaveAttribute("title", "Back");
});
