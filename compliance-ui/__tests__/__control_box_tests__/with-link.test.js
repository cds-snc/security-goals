import React from "react";
import { cleanup, render } from "react-testing-library";
import { WithLink } from "../../components/controlbox/WithLink.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders WithLink with link as prop", async () => {
  const { getByTestId } = render(
    <WithLink id="AU-6" link="/singlerelease/AU-6">
      {" "}
      this is a link{" "}
    </WithLink>
  );

  expect(getByTestId("control-box-link")).toHaveTextContent("this is a link");
  expect(getByTestId("control-box-link")).toHaveAttribute(
    "aria-label",
    "Control: AU-6"
  );
});

test("Renders WithLink with no link as prop", async () => {
  const { getByTestId } = render(
    <WithLink id="AU-6"> this is a link </WithLink>
  );

  expect(getByTestId("with-link-children")).toHaveTextContent("this is a link");
});
