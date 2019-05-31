import React from "react";
import { cleanup, render } from "@testing-library/react";
import ReleaseBox from "../../components/ReleaseBox.js";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Renders Passing Release Box", async () => {
  const { getByTestId } = render(
    <ReleaseBox
      release="123456789"
      passed="true"
      timestamp="10:00pm, September 12th, 1990"
      passing="28"
      total="28"
      link="/singlerelease/123456789"
    />
  );

  expect(getByTestId("release-box-link")).toHaveAttribute(
    "href",
    "/singlerelease/123456789"
  );
  expect(getByTestId("release-box")).toHaveAttribute(
    "aria-label",
    "Passed release #: 123456789, 28 out of 28 checks passing"
  );
  expect(getByTestId("release-box-title")).toHaveTextContent(
    "Passed release: #123456789"
  );

  expect(getByTestId("release-box-timestamp")).toHaveTextContent(
    "10:00pm, September 12th, 1990"
  );

  expect(getByTestId("release-box-passing")).toHaveTextContent(
    "28 / 28 checks"
  );
});

test("Renders Failing Release Box", async () => {
  const { getByTestId } = render(
    <ReleaseBox
      release="123456789"
      passed="false"
      timestamp="10:30pm, September 12th, 1990"
      passing="27"
      total="28"
      link={`/singlerelease/123456789`}
    />
  );

  expect(getByTestId("release-box-link")).toHaveAttribute(
    "href",
    "/singlerelease/123456789"
  );
  expect(getByTestId("release-box")).toHaveAttribute(
    "aria-label",
    "Failed release #: 123456789, 27 out of 28 checks passing"
  );
  expect(getByTestId("release-box-title")).toHaveTextContent(
    "Failed release: #123456789"
  );

  expect(getByTestId("release-box-timestamp")).toHaveTextContent(
    "10:30pm, September 12th, 1990"
  );

  expect(getByTestId("release-box-passing")).toHaveTextContent(
    "27 / 28 checks"
  );
});
