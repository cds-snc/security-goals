import React from "react";
import { cleanup, render } from "react-testing-library";
import "jest-dom/extend-expect";
import { data } from "../../__mocks__/mockDataSingleRelease.js";

global.window.__NEXT_DATA__ = {
  ids: []
};

const PdfSinglePage = require("../../pages/pdf-singlerelease").default;

afterEach(cleanup); // <-- add this

test("Renders Single Release Page with status bar and control boxes (w/ data)", async () => {
  const { getByTestId, getAllByTestId } = render(
    <PdfSinglePage data={data} releaseParam="1546522884800" perPage="3" />
  );

  const controlBoxes = getAllByTestId("control-box");
  const controlBoxTimestamps = getAllByTestId("control-box-timestamp");
  const pageNumber = getAllByTestId("page-number");

  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );
  expect(getByTestId("pdf-control-list"));

  expect(controlBoxes).toHaveLength(29);
  expect(controlBoxes[0]).toHaveTextContent("AU-6");

  expect(controlBoxTimestamps).toHaveLength(29);
  expect(controlBoxTimestamps[0]).toHaveTextContent("08:41:47 AM, 03-01-2019");

  expect(pageNumber[0]).toHaveTextContent("Page 1");
});

test("Single Release Page renders <Failed /> w/ no Data", async () => {
  const { getByTestId } = render(<PdfSinglePage />);
  expect(getByTestId("api-fail")).toHaveTextContent(
    "Failed to fetch GraphQL API data"
  );
});
