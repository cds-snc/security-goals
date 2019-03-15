import React from "react";
import { cleanup, render } from "react-testing-library";
import "jest-dom/extend-expect";
import { result } from "../../__mocks__/mockDataPDFDetails.js";
import { dataDetails } from "../../__mocks__/mockData.js";

global.window.__NEXT_DATA__ = {
  ids: []
};

const PdfDetailsPage = require("../../pages/pdf-details").default;

afterEach(cleanup); // <-- add this

test("Renders Details Page w/ data", async () => {
  const { getByTestId, getAllByTestId } = render(
    <PdfDetailsPage
      data={result.data}
      summary={true}
      perPage={3}
      perFirstPage={2}
      controlParam="AU-6"
    />
  );

  const controlBoxes = getAllByTestId("control-box");
  const pageNumber = getAllByTestId("page-number");

  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );

  expect(getByTestId("pdf-details-h1")).toHaveTextContent("AU-6 Details:");
  expect(getByTestId("pdf-details-description")).toHaveTextContent(
    "(A) The organization reviews and analyzes information system audit records [Assignment: organization-defined frequency] for indications of [Assignment: organization-defined inappropriate or unusual activity]. (B) The organization reports findings to [Assignment: organization-defined personnel or roles]."
  );

  expect(getByTestId("pdf-control-list"));

  expect(controlBoxes).toHaveLength(1);
  expect(controlBoxes[0]).toHaveTextContent(
    "08:41:47 AM, 03-01-2019FailedThe organization does audit reports and reviews in line with written policy.Reference(s): https://github.com/cds-snc/compliance-policy-documents/audit-review.mdComponent: Policy"
  );

  expect(pageNumber[0]).toHaveTextContent("Page 1");
});

test("Renders Details Collapsible with placeholder text Page", async () => {
  const { getByTestId, getAllByTestId } = render(
    <PdfDetailsPage
      data={dataDetails}
      summary={true}
      perPage={3}
      perFirstPage={2}
      controlParam="AU-6"
    />
  );

  const controlBoxes = getAllByTestId("control-box");
  const pageNumber = getAllByTestId("page-number");

  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );

  expect(getByTestId("pdf-details-h1")).toHaveTextContent("Details:");
  expect(getByTestId("pdf-details-description")).toHaveTextContent(
    "The description seems to be missing. Sorry for the inconvenience, please try back at a later time if you are still looking for more information on the control in question."
  );

  expect(getByTestId("pdf-control-list"));

  expect(controlBoxes).toHaveLength(27);
  expect(controlBoxes[0]).toHaveTextContent(
    "10:28:17 AM, 11-02-2019PassedThe application uses an ESLint file to do static code analysis in the front end.Reference(s): https://github.com/cds-snc/report-a-cybercrime/blob/master/frontend/.eslintrc.jsonComponent: Source code"
  );

  expect(pageNumber[0]).toHaveTextContent("Page 1");
});

test("Details Page renders <Failed /> w/ no Data", async () => {
  const { getByTestId } = render(<PdfDetailsPage />);
  expect(getByTestId("api-fail")).toHaveTextContent(
    "Failed to fetch GraphQL API data"
  );
});
