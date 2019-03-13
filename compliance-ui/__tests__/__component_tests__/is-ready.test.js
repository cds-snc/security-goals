import React from "react";
import { cleanup, render } from "react-testing-library";
import { IsReady } from "../../components";
import "jest-dom/extend-expect";
import { data } from "../../__mocks__/mockDataSingleRelease.js";

afterEach(cleanup); // <-- add this

test("IsReady", async () => {
  const { getByTestId } = render(<IsReady data={data} />);
  expect(getByTestId("status-bar"));
});
