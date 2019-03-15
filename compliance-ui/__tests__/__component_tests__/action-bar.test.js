import React from "react";
import { cleanup, render } from "react-testing-library";
import { ActionBar } from "../../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Action Bar renders Print PDF button with URL based on props", async () => {
  const { getByTestId } = render(<ActionBar pdf="pdf-details" id="AU-6" />);
  expect(getByTestId("print-message")).toHaveTextContent(
    "Print this page (PDF)"
  );
  expect(getByTestId("print-link")).toHaveAttribute(
    "href",
    "/pdf-details/AU-6"
  );
});

test("Action Bar renders Back to top button with proper aria-label", async () => {
  const { getByTestId } = render(<ActionBar back2top={true} />);
  expect(getByTestId("back-to-top")).toHaveTextContent("Back To Top of Page");
  expect(getByTestId("back-to-top")).toHaveAttribute(
    "aria-label",
    "click or press 'Enter' on this link to navigate to the top of the page"
  );
});
