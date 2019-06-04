import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Collapsible } from "../../components/Collapsible";
import {
  collapseData,
  collapseDataEmpty
} from "../../__mocks__/mockDataCollapsible.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Collapsible box renders with description and toggle button", async () => {
  const { getByTestId } = render(
    <Collapsible
      title="AU-6"
      description={collapseData.controlData}
      control="AU-6"
    />
  );
  expect(getByTestId("collapsible-h2")).toHaveTextContent("AU-6");
  expect(getByTestId("main-description")).toHaveTextContent(
    "(A) The organization reviews and analyzes information system audit records [Assignment: organization-defined frequency] for indications of [Assignment: organization-defined inappropriate or unusual activity].(B) The organization reports findings to [Assignment: organization-defined personnel or roles]."
  );

  expect(getByTestId("toggle-read")).toHaveTextContent(
    "Read the AU-6 description"
  );

  expect(getByTestId("up-arrow-circle")).toHaveAttribute(
    "id",
    "Up Arrow Circle"
  );

  expect(getByTestId("upArrowCircle-path-1")).toHaveAttribute(
    "d",
    "M8,256C8,119,119,8,256,8S504,119,504,256,393,504,256,504,8,393,8,256ZM239,142.1,103.5,277.6a23.9,23.9,0,0,0,0,33.9l17,17a23.9,23.9,0,0,0,33.9,0L256,226.9,357.6,328.5a23.9,23.9,0,0,0,33.9,0l17-17a23.9,23.9,0,0,0,0-33.9L273,142.1A24,24,0,0,0,239,142.1Z"
  );
});

test("Collapsible box (no Data) renders with toggle button and placeholder description", async () => {
  const { getByTestId } = render(
    <Collapsible
      title="SA-11"
      description={collapseDataEmpty.controlData}
      control="SA-11"
    />
  );

  expect(getByTestId("collapsible-h2")).toHaveTextContent("SA-11");
  expect(getByTestId("main-description")).toHaveTextContent(
    "The description seems to be missing. Sorry for the inconvenience, please try back at a later time if you are still looking for more information on the control in question."
  );

  expect(getByTestId("toggle-read")).toHaveTextContent(
    "Read the SA-11 description"
  );

  expect(getByTestId("up-arrow-circle")).toHaveAttribute(
    "id",
    "Up Arrow Circle"
  );

  expect(getByTestId("upArrowCircle-path-1")).toHaveAttribute(
    "d",
    "M8,256C8,119,119,8,256,8S504,119,504,256,393,504,256,504,8,393,8,256ZM239,142.1,103.5,277.6a23.9,23.9,0,0,0,0,33.9l17,17a23.9,23.9,0,0,0,33.9,0L256,226.9,357.6,328.5a23.9,23.9,0,0,0,33.9,0l17-17a23.9,23.9,0,0,0,0-33.9L273,142.1A24,24,0,0,0,239,142.1Z"
  );
});

// Still need toggle test
