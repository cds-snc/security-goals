import React from "react";
import { cleanup, render } from "react-testing-library";
import { Details } from "../../components";
import "jest-dom/extend-expect";
import { dataDetails } from "../../__mocks__/mockData.js";

afterEach(cleanup); // <-- add this

test("Details page renders control boxes from input data", async () => {
  const { getByTestId, getAllByTestId } = render(
    <Details id="SA-11" data={dataDetails} sortedData={dataDetails.controlReleaseData} />
  );

  const releaseLinks = getAllByTestId("release-link");
  const controlBoxes = getAllByTestId("control-box");
  const controlBoxTitles = getAllByTestId("control-box-title");
  const references = getAllByTestId("references");
  const components = getAllByTestId("component");

  expect(getByTestId("verification-h1")).toHaveTextContent("Verification:");
  expect(getByTestId("collapsible-h2")).toHaveTextContent("SA-11");
  expect(getByTestId("toggle-read")).toHaveTextContent(
    "Read the SA-11 description"
  );

  expect(releaseLinks).toHaveLength(9);
  expect(releaseLinks[0]).toHaveAttribute(
    "href",
    "/singlerelease/6a29e06ffcb4adef8e8e332ac688e71f57450abf-1549898889619"
  );

  expect(getByTestId("control-list"));
  expect(controlBoxes).toHaveLength(27);

  expect(controlBoxTitles).toHaveLength(27);
  expect(controlBoxTitles[0]).toHaveTextContent("10:28:17 AM, 11-02-2019");

  expect(references).toHaveLength(27);
  expect(references[0]).toHaveTextContent(
    "Reference(s): https://github.com/cds-snc/report-a-cybercrime/blob/master/frontend/.eslintrc.json"
  );

  expect(components).toHaveLength(27);
  expect(components[0]).toHaveTextContent("Component: Source code");
});
