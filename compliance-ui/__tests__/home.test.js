import React from "react";
import { cleanup, render } from "react-testing-library";
import { Home } from "../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Home", async () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("home")).toHaveTextContent("No Verifications found");
});

test("Home Error", async () => {
  const { getByTestId } = render(<Home err="true" />);
  expect(getByTestId("api-fail")).toHaveTextContent("Failed to fetch");
});
