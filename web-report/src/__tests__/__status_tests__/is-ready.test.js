import React from "react";
import { cleanup, render } from "@testing-library/react";
import { IsReady } from "../../components";
import "jest-dom/extend-expect";
import { data } from "../../__mocks__/mockDataSingleRelease.js";

afterEach(cleanup); // <-- add this

test("Status Bar renders with data", async () => {
  const { getByTestId } = render(<IsReady data={data.releases} />);
  expect(getByTestId("status-bar")).toHaveTextContent(
    "Some checks have failed22 of 28 passing"
  );
});

test("Status Bar renders error message with no data", async () => {
  const { getByTestId } = render(<IsReady />);
  expect(getByTestId("error-message")).toHaveTextContent(
    "Sorry, something went wrong. The status of the release could not be found."
  );
});
