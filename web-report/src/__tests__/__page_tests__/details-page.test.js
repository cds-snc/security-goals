import React from "react";
import { cleanup, render, wait } from "@testing-library/react";
import "jest-dom/extend-expect";
import { dataDetails } from "../../__mocks__/mockData.js";
import { detailStatus } from "../../../api/index";

jest.mock("../../../api/index", () => ({
  detailStatus: jest.fn()
}));

jest.mock("../../../src/config", () => ({
  runtimeConfig: { relative_path: "", pdf_report_url: "https://foo" }
}));

const DetailsPage = require("../../pages/DetailsPage").default;

afterEach(cleanup); // <-- add this

test("Renders DetailsPage", async () => {
  detailStatus.mockReturnValue(dataDetails);

  const { getByTestId, getAllByTestId } = render(
    <DetailsPage
      controlParam="SA-11"
      match={{ params: { controlId: "SA-11" } }}
    />
  );
  await wait(() => {
    const releaseLinks = getAllByTestId("release-link");
    const controlBoxes = getAllByTestId("control-box");
    const controlBoxTitles = getAllByTestId("control-box-title");
    const references = getAllByTestId("references");
    const components = getAllByTestId("component");

    expect(getByTestId("main-header-h1")).toHaveTextContent(
      "Are we compliant yet?"
    );

    expect(getByTestId("print-message")).toHaveTextContent(
      "Print this page (PDF)"
    );

    expect(getByTestId("print-link")).toHaveAttribute("href", "https://foo");

    expect(getByTestId("cds-logo")).toHaveAttribute(
      "id",
      "CDS Logo White Outline"
    );

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

    expect(controlBoxes).toHaveLength(27);

    expect(controlBoxTitles).toHaveLength(27);

    expect(references).toHaveLength(27);
    expect(references[0]).toHaveTextContent(
      "Reference(s): https://github.com/cds-snc/report-a-cybercrime/blob/master/frontend/.eslintrc.json"
    );

    expect(components).toHaveLength(27);
    expect(components[0]).toHaveTextContent("Component: Source code");

    expect(getByTestId("back-to-top")).toHaveTextContent("Back To Top of Page");
    expect(getByTestId("back-to-top")).toHaveAttribute(
      "aria-label",
      "click or press 'Enter' on this link to navigate to the top of the page"
    );
  });
});
