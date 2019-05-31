import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Count } from "../../components/status/Count.js";
import { data } from "../../__mocks__/mockDataSingleRelease.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Counter renders error message with empty status prop", async () => {
  const { getByTestId } = render(<Count />);

  expect(getByTestId("error-message")).toHaveTextContent(
    "Status Counter is missing data."
  );
});

test("Counter renders total", async () => {
  const { getByTestId } = render(<Count status={data.releases} />);

  expect(getByTestId("total")).toHaveTextContent("22 of 28 passing");
});
