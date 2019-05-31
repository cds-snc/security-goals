import React from "react";
import { cleanup, render } from "@testing-library/react";
import { References } from "../../components/controlbox/References.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Reference with proper aria-label for link, text renders as link", async () => {
  const { getByTestId } = render(
    <References
      timestamp="10:00pm"
      description="This is the description."
      component="This is a test component."
      text="This is a test reference."
      status="true"
      urlCheck={true}
    />
  );

  expect(getByTestId("references")).toHaveTextContent(
    "Reference(s): This is a test reference."
  );

  expect(getByTestId("references-link")).toHaveAttribute(
    "href",
    "This is a test reference."
  );

  expect(getByTestId("references-link")).toHaveAttribute(
    "aria-label",
    "Verification passed: 10:00pm, description of check: This is the description., verification reference: This is a test reference., component category: This is a test component."
  );
});

test("Renders Reference with failed URL check", async () => {
  const { getByTestId } = render(
    <References
      timestamp="10:00pm"
      description="This is the description."
      component="This is a test component."
      text="This is a test reference."
      status="true"
      urlCheck={false}
    />
  );

  expect(getByTestId("references")).toHaveTextContent(
    "Reference(s): This is a test reference."
  );

  expect(getByTestId("references-link")).toHaveAttribute(
    "aria-label",
    "Verification passed: 10:00pm, description of check: This is the description., verification reference: This is a test reference., component category: This is a test component."
  );

  expect(getByTestId("references-link")).toHaveAttribute("href", "#");
});
