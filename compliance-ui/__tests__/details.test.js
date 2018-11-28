import React from "react";
import { cleanup, render } from "react-testing-library";
import { Details } from "../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Details", async () => {
  const { getByTestId } = render(<Details data={{ test: true }} />);
  expect(getByTestId("details")).toHaveTextContent("Print this page (PDF)");
});

test("Details Error", async () => {
  const { getByTestId } = render(<Details err="true" data={{ test: true }} />);
  expect(getByTestId("api-fail")).toHaveTextContent("Failed to fetch");
});
