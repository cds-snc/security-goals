import React from "react";
import { cleanup, render } from "react-testing-library";
import { PrintButton } from "../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("Rendered Print Icon w/ working link", async () => {
  const { getByTestId } = render(
    <PrintButton link="/pdf-singlerelease/1546522884800/" />
  );
  expect(getByTestId("print-message")).toHaveTextContent(
    "Print this page (PDF)"
  );
  expect(getByTestId("print-link")).toHaveAttribute(
    "href",
    "/pdf-singlerelease/1546522884800/"
  );

  expect(getByTestId("print-icon")).toHaveAttribute("id", "Print Icon");
  expect(getByTestId("print-path-1")).toHaveAttribute(
    "d",
    "M111.8,28.7H10.2A10.24,10.24,0,0,0,0,38.9V86.8H22.2V74.5H99.8V86.8H122V38.9A10.24,10.24,0,0,0,111.8,28.7ZM89.2,50.5a3.9,3.9,0,1,1,3.9-3.9A4,4,0,0,1,89.2,50.5Zm13.7,0a3.9,3.9,0,1,1,3.9-3.9A3.91,3.91,0,0,1,102.9,50.5Z"
  );
  expect(getByTestId("print-path-2")).toHaveAttribute(
    "d",
    "M33.67,81v36.33H89.2V81ZM47.3,91.6H59.9a2.2,2.2,0,0,1,0,4.4H47.3a2.2,2.2,0,1,1,0-4.4Zm27.4,14.9H47.3a2.2,2.2,0,1,1,0-4.4H74.7a2.29,2.29,0,0,1,2.2,2.2A2.22,2.22,0,0,1,74.7,106.5Z"
  );

  expect(getByTestId("print-polygon-1")).toHaveAttribute(
    "points",
    "92.9 23.1 92.9 0 29.1 0 29.1 23.1 92.9 23.1"
  );

  expect(getByTestId("print-polygon-2")).toHaveAttribute(
    "points",
    "86.6 115.1 35.4 115.1 35.4 81 29.1 81 29.1 121.4 92.9 121.4 92.9 81 86.6 81 86.6 115.1"
  );
});
