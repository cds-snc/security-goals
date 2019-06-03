import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Footer } from "../../components/controlbox/Footer.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Footer for regular control box format", async () => {
  const { getByTestId } = render(
    <Footer
      status="true"
      description="This is a test description."
      timestamp="Monday May 12th, 11:00pm"
      titleTimestamp={false}
      status="true"
    />
  );

  expect(getByTestId("control-box-timestamp")).toHaveTextContent(
    "Monday May 12th, 11:00pm"
  );
  expect(getByTestId("description")).toHaveTextContent(
    "This is a test description."
  );
});

test("Renders Footer for Details Page format", async () => {
  const { getByTestId } = render(
    <Footer
      status="true"
      description="This is a test description."
      references="This is a test reference."
      component="This is a test component"
      titleTimestamp={true}
      status="true"
    />
  );

  expect(getByTestId("description")).toHaveTextContent(
    "This is a test description."
  );

  expect(getByTestId("component")).toHaveTextContent(
    "Component: This is a test component"
  );

  expect(getByTestId("references")).toHaveTextContent(
    "Reference(s): This is a test reference."
  );
});
