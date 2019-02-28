import React from "react";
import { cleanup, render } from "react-testing-library";
import { data } from "../__mocks__/mockDataSingleRelease.js";
import { GridSingleRelease, GridDetails } from "../components/Grid";
import { passFailData } from "../util";
import "jest-dom/extend-expect";
import { controls } from "../__mocks__/controls";

afterEach(cleanup); // <-- add this

test("Single Release Grid (w/ Data) - renders no controls found", async () => {
  const { getByTestId } = render(<GridSingleRelease releases={data} />);
});

test("Details Grid (w/ Data) - renders no controls found", async () => {
  const { getByTestId } = render(<GridDetails releases={data} />);
});

test("Single Release Grid (No Data) - renders no controls found", async () => {
  const { getByTestId } = render(<GridSingleRelease />);
});

test("Details Grid (No Data) - renders no controls found", async () => {
  const { getByTestId } = render(<GridDetails />);
});

/* test("Grid - renders control boxes", async () => {
  const data = await passFailData(controls.data);
  const { getByTestId } = render(<Grid controls={data} />);

  expect(getByTestId("control-box-title")).toHaveTextContent(
    "AC-2 - Account Management"
  );

  expect(getByTestId("control-box-fail")).toHaveTextContent("Failed");

  expect(getByTestId("description")).toHaveTextContent(
    "The application follows Account Management policy as laid out in documentation."
  );
});
*/
