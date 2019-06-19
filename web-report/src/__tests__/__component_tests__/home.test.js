import React from "react";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { cleanup, render } from "@testing-library/react";
import Home from "../../components/Home.js";
import { sortedData } from "../../__mocks__/mockDataIndex.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders the Home component", async () => {
  const { getByTestId, getAllByTestId } = render(
    <Home sortedData={sortedData} />
  );
  const releaseLinks = getAllByTestId("release-box-link");

  expect(getByTestId("index-h1")).toHaveTextContent("Latest Releases");
  expect(getByTestId("release-list"));
  expect(releaseLinks).toHaveLength(4);
});
