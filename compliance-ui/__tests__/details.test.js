import React from "react";
import { cleanup, render } from "react-testing-library";
import { Details } from "../components";
import "jest-dom/extend-expect";
import { data } from "../__mocks__/mockData.js";

afterEach(cleanup); // <-- add this

test("Details", async () => {
  const { getByTestId } = render(<Details id="SA-11" data={data} />);
  expect(getByTestId("verification-h1")).toHaveTextContent("Verification:");
});

test("Details Error", async () => {
  const { getByTestId } = render(<Details id="SA-11" err="true" data={data} />);
  expect(getByTestId("api-fail")).toHaveTextContent("Failed to fetch");
});
