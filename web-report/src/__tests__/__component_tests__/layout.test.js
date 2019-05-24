import React from "react";
import { cleanup, render } from "react-testing-library";
import Layout from "../../components/Layout.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Layout with Header(+ pdf-link), and Footer (+ back-to-top)", async () => {
  const { getByTestId } = render(<Layout pdf={`pdf-details/AU-6`} />);
  expect(getByTestId("header"));
  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  /*
  expect(getByTestId("print-message")).toHaveTextContent(
    "Print this page (PDF)"
  );
  expect(getByTestId("print-link")).toHaveAttribute(
    "href",
    "/pdf-details/AU-6/"
  );
  */
  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );

  expect(getByTestId("back-to-top")).toHaveTextContent("Back To Top of Page");
  expect(getByTestId("back-to-top")).toHaveAttribute(
    "aria-label",
    "click or press 'Enter' on this link to navigate to the top of the page"
  );
});

test("Layout renders children", async () => {
  const { getByTestId } = render(
    <Layout>
      <p>This is an example of layout child text.</p>
    </Layout>
  );
  expect(getByTestId("layout-children")).toHaveTextContent(
    "This is an example of layout child text."
  );
});
