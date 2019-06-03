import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Failed } from "../../components";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("API Failed", async () => {
  const { getByTestId } = render(<Failed />);
  expect(getByTestId("api-fail")).toHaveTextContent(
    "Failed to fetch GraphQL API data"
  );
});
