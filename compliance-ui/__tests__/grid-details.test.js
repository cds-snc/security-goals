import React from "react";
import { cleanup, render } from "react-testing-library";
import { sortedData } from "../__mocks__/mockDataDetails.js";
import { GridDetails } from "../components/Grid";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Details Grid (w/ Data) renders controls (Timestamp as Title separated by Release)", async () => {
  const { getByTestId, getAllByTestId } = render(
    <GridDetails
      controlTitle="PL-8"
      titleColour={true}
      releases={sortedData}
      titleTimestamp={true}
      detailsPage={true}
    />
  );

  const releaseLinks = getAllByTestId("release-link");
  const controlBoxes = getAllByTestId("control-box");
  const controlBoxTitles = getAllByTestId("control-box-title");
  const references = getAllByTestId("references");
  const components = getAllByTestId("component");

  expect(releaseLinks).toHaveLength(1);
  expect(releaseLinks[0]).toHaveAttribute(
    "href",
    "/singlerelease/1546522884800"
  );

  expect(getByTestId("control-list"));
  expect(controlBoxes).toHaveLength(1);

  expect(controlBoxTitles).toHaveLength(1);
  expect(controlBoxTitles[0]).toHaveTextContent("08:41:43 AM, 03-01-2019");

  expect(references).toHaveLength(1);
  expect(references[0]).toHaveTextContent(
    "Reference(s): https://github.com/cds-snc/compliance-policy-documents/information-architecture.md"
  );

  expect(components).toHaveLength(1);
  expect(components[0]).toHaveTextContent("Component: Policy");
});

test("Details Grid w/ No Data renders failed message", async () => {
  const { getByTestId } = render(<GridDetails />);

  expect(getByTestId("error-message")).toHaveTextContent(
    "Sorry, something went wrong. No controls could be rendered."
  );
});
