import React from "react";
import { cleanup, render } from "react-testing-library";
import { data } from "../../__mocks__/mockDataIndex.js";
import "jest-dom/extend-expect";

global.window.__NEXT_DATA__ = {
  ids: []
};

const ReleasesPage = require("../../pages/index").default;

afterEach(cleanup); // <-- add this

test("Renders ReleasesPage Boxes (w/ Data)", async () => {
  const { getByTestId, getAllByTestId } = render(<ReleasesPage data={data} />);
  const releaseLinks = getAllByTestId("release-box-link");
  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("print-message")).toHaveTextContent(
    "Print this page (PDF)"
  );
  expect(getByTestId("print-link")).toHaveAttribute("href", "/pdf-releases/");

  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );

  expect(getByTestId("index-h1")).toHaveTextContent("Latest Releases:");
  expect(getByTestId("release-list"));
  expect(releaseLinks).toHaveLength(4);

  expect(getByTestId("back-to-top")).toHaveTextContent("Back To Top of Page");
  expect(getByTestId("back-to-top")).toHaveAttribute(
    "aria-label",
    "click or press 'Enter' on this link to navigate to the top of the page"
  );
});

test("Renders <Failed /> w/ no data", async () => {
  const { getByTestId } = render(<ReleasesPage />);
  expect(getByTestId("api-fail")).toHaveTextContent(
    "Failed to fetch GraphQL API data"
  );
});
