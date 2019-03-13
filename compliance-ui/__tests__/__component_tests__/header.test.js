import React from "react";
import { cleanup, render } from "react-testing-library";
import { Header } from "../../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Header renders with proper message, action bar, and image", async () => {
  const { getByTestId } = render(
    <Header
      pdf="pdf-singlerelease"
      id="6a29e06ffcb4adef8e8e332ac688e71f57450abf-1549898889619"
    />
  );
  expect(getByTestId("header"));
  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("print-message")).toHaveTextContent(
    "Print this page (PDF)"
  );
  expect(getByTestId("print-link")).toHaveAttribute(
    "href",
    "/pdf-singlerelease/6a29e06ffcb4adef8e8e332ac688e71f57450abf-1549898889619"
  );

  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );
});
