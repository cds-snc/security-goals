import React from "react";
import { cleanup, render } from "react-testing-library";
import { data } from "../../__mocks__/mockDataIndex.js";

global.window.__NEXT_DATA__ = {
  ids: []
};

const ReleasesPage = require("../../pages/index").default;

afterEach(cleanup); // <-- add this

test("Index Page renders correctly", async () => {
  const { getByTestId } = render(<ReleasesPage data={data} />);

  expect(getByTestId("header"));
});

/*
test("IsReady data => 1/2 passing", async () => {
  const { getByTestId } = render(<IsReady data={data} />);
});
*/

// it("mocks and calls window.location.reload", () => {
// window.location.reload = jest.fn();
// window.location.reload();
// expect(window.location.reload).toHaveBeenCalled();
// });
