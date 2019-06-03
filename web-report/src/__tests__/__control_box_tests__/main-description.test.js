import React from "react";
import { cleanup, render } from "@testing-library/react";
import { MainDescription } from "../../components/controlbox/MainDescription.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Main Description", async () => {
  const { getByTestId } = render(
    <MainDescription description="This is a test description." />
  );

  expect(getByTestId("main-description")).toHaveTextContent(
    "This is a test description."
  );
});
