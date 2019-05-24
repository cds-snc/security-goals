import React from "react";
import { cleanup, render } from "react-testing-library";
import { PassFailText } from "../../components";
import "jest-dom/extend-expect";
import { data, passingData } from "../../__mocks__/mockDataSingleRelease.js";

afterEach(cleanup); // <-- add this

test("Fail Text renders properly", async () => {
  const { getByTestId } = render(<PassFailText status={data.releases} />);
  expect(getByTestId("status-text")).toHaveTextContent(
    "Some checks have failed"
  );
});

test("Pass Text renders properly", async () => {
  const { getByTestId } = render(<PassFailText status={passingData.releases} />);
  expect(getByTestId("status-text")).toHaveTextContent(
    "All the checks have passed"
  );
});
