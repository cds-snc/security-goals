import React from "react";
import { cleanup, render } from "@testing-library/react";
import { data } from "../../__mocks__/mockDataSingleRelease.js";
import { GridSingleRelease } from "../../components/Grid";
import "jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';


afterEach(cleanup); // <-- add this

test("Single Release Grid w/ Data renders controls", async () => {
  const { getByTestId, getAllByTestId } = render(
    <MemoryRouter><GridSingleRelease releases={data.releases} link={true} /></MemoryRouter>
  );
  const controlBoxes = getAllByTestId("control-box");
  const controlBoxTitles = getAllByTestId("control-box-title");
  const controlBoxTimestamps = getAllByTestId("control-box-timestamp");
  const controlBoxLinks = getAllByTestId("control-box-link");

  expect(getByTestId("control-list"));
  expect(controlBoxes).toHaveLength(29);
  expect(controlBoxTitles).toHaveLength(29);
  expect(controlBoxTimestamps).toHaveLength(29);
  expect(controlBoxLinks).toHaveLength(29);

  expect(controlBoxTitles[0]).toHaveTextContent("AU-6");
  expect(controlBoxLinks[0]).toHaveAttribute("href", "/controls/AU-6");
});

test("Single Release Grid w/ No Data renders failed message", async () => {
  const { getByTestId } = render(<MemoryRouter><GridSingleRelease /></MemoryRouter>);

  expect(getByTestId("error-message")).toHaveTextContent(
    "Sorry, something went wrong. No controls could be rendered."
  );
});
