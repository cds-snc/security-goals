import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BackToTopButton } from "../../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Back To Top Button renders with proper text and svg", async () => {
  const { getByTestId } = render(<BackToTopButton />);
  expect(getByTestId("back-to-top")).toHaveTextContent("Back To Top of Page");
  expect(getByTestId("back-to-top")).toHaveAttribute(
    "aria-label",
    "click or press 'Enter' on this link to navigate to the top of the page"
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
