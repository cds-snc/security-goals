import React from "react";
import { cleanup, render } from "react-testing-library";
import ReleasesPage from "../pages/index";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Home", async () => {
  const { getByTestId } = render(<ReleasesPage />);
});

test("Home Error", async () => {
  const { getByTestId } = render(<ReleasesPage err="true" />);
  expect(getByTestId("api-fail")).toHaveTextContent("Failed to fetch");
});
