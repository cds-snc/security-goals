import React from "react";
import { cleanup, render } from "react-testing-library";
import { IsReady } from "../components";
import { passFailData } from "../util";
import "jest-dom/extend-expect";
import { data } from "../__mocks__/mockDataSingleRelease.js";

afterEach(cleanup); // <-- add this

test("IsReady => no data", async () => {
  const { getByTestId } = render(<IsReady />);
  /*expect(getByTestId("status-text")).toHaveTextContent(
    "Some checks have failed"
  );
  expect(getByTestId("total")).toHaveTextContent("-1");
  expect(1).toEqual(1);
  */
});

test("IsReady data => 1/2 passing", async () => {
  const { getByTestId } = render(<IsReady data={data} />);
  /*
  expect(getByTestId("status-text")).toHaveTextContent(
    "Some checks have failed"
  );
  expect(getByTestId("total")).toHaveTextContent("23 of 32 passing");
  */
});
