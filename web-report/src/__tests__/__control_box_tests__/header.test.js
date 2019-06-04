import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Header } from "../../components/controlbox/Header.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Passing Header with normal title", async () => {
  const { getByTestId } = render(
    <Header
      title="AU-6"
      status="true"
      timestamp="Monday May 11th, 2018 10:30pm"
      titleTimestamp={false}
    />
  );

  expect(getByTestId("control-box-title")).toHaveTextContent("AU-6");
  expect(getByTestId("control-box-pass")).toHaveTextContent("Passed");
});

test("Renders Failing Header with timestamp title", async () => {
  const { getByTestId } = render(
    <Header
      title="AU-6"
      status="false"
      timestamp="Monday May 11th, 2018 10:30pm"
      titleTimestamp={true}
    />
  );

  expect(getByTestId("control-box-title")).toHaveTextContent(
    "Monday May 11th, 2018 10:30pm"
  );
  expect(getByTestId("control-box-fail")).toHaveTextContent("Failed");
});
