import React from "react";
import { cleanup, render } from "react-testing-library";
import "jest-dom/extend-expect";
import { data } from "../../__mocks__/mockDataIndex.js";

global.window.__NEXT_DATA__ = {
  ids: []
};

const PdfReleasesPage = require("../../pages/pdf-releases").default;

afterEach(cleanup); // <-- add this

test("Renders Single Release Page with status bar and control boxes (w/ data)", async () => {
  const { getByTestId, getAllByTestId } = render(
    <PdfReleasesPage data={data} perPage="4" />
  );

  const releaseBoxes = getAllByTestId("pdf-release-box-li");
  const pageNumber = getAllByTestId("page-number");
  const releaseBoxTitles = getAllByTestId("pdf-release-title");
  const releaseBoxTimestamps = getAllByTestId("pdf-release-timestamp");
  const releaseBoxPassing = getAllByTestId("pdf-release-box-passing");

  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );

  expect(getByTestId("pdf-latest-releases")).toHaveTextContent(
    "Latest Releases:"
  );

  expect(getByTestId("pdf-control-list"));

  expect(releaseBoxes).toHaveLength(4);

  expect(releaseBoxTitles).toHaveLength(4);
  expect(releaseBoxTitles[0]).toHaveTextContent(
    "Failed release: #1546522884800"
  );

  expect(releaseBoxTimestamps).toHaveLength(4);
  expect(releaseBoxTimestamps[0]).toHaveTextContent("14:25:42 PM, 03-01-2019");

  expect(releaseBoxPassing).toHaveLength(4);
  expect(releaseBoxPassing[0]).toHaveTextContent("22 / 28 checks");

  expect(pageNumber[0]).toHaveTextContent("Page 1");
});

test("Single Release Page renders <Failed /> w/ no Data", async () => {
  const { getByTestId } = render(<PdfReleasesPage />);
  expect(getByTestId("api-fail")).toHaveTextContent(
    "Failed to fetch GraphQL API data"
  );
});
