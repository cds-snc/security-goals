import React from "react";
import { cleanup, render } from "react-testing-library";
import { ControlBox } from "../../components";
import "jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup); // <-- add this

test("Renders Default Failing Control", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
    <ControlBox
      description="the description"
      id="S1"
      title="S1 is the title"
      status="true"
      link={true}
      status="false"
      timestamp="2019-01-03T13:41:47Z"
    /></MemoryRouter>
  );

  expect(getByTestId("control-box-title")).toHaveTextContent("S1 is the title");
  expect(getByTestId("control-box-link")).toHaveAttribute(
    "href",
    "/controls/S1"
  );
  expect(getByTestId("description")).toHaveTextContent("the description");
  expect(getByTestId("control-box-fail")).toHaveTextContent("Failed");
});

test("Renders Default Passing Control", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
    <ControlBox
      description="the description"
      id="S1"
      title="S1 is the title"
      status="true"
      link={true}
      status="true"
      timestamp="2019-01-03T13:41:47Z"
    /></MemoryRouter>
  );
  // debug();

  expect(getByTestId("control-box-title")).toHaveTextContent("S1 is the title");
  expect(getByTestId("control-box-link")).toHaveAttribute(
    "href",
    "/controls/S1"
  );
  expect(getByTestId("description")).toHaveTextContent("the description");
  expect(getByTestId("control-box-pass")).toHaveTextContent("Passed");
});

test("Renders Details Failing Control (timestamp title + additional info)", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
    <ControlBox
      status="false"
      id="SA-11"
      references="This is a reference"
      component="This is a component"
      description="This is a description"
      title="This is the SA-11 title"
      titleTimestamp={true}
      timestamp="2019-01-03T13:41:47Z"
      link={false}
      detailsPage={true}
    />
    </MemoryRouter>
  );
  // debug();

  expect(getByTestId("description")).toHaveTextContent("This is a description");
  expect(getByTestId("component")).toHaveTextContent("This is a component");
  expect(getByTestId("references")).toHaveTextContent("This is a reference");
  expect(getByTestId("control-box-fail")).toHaveTextContent("Failed");
});

test("Renders Details Passing Control (timestamp title + additional info)", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
    <ControlBox
      status="true"
      id="SA-11"
      references="This is a reference"
      component="This is a component"
      description="This is a description"
      title="This is the SA-11 title"
      titleTimestamp={true}
      timestamp="2019-01-03T13:41:47Z"
      link={false}
      detailsPage={true}
    />
    </MemoryRouter>
  );
  // debug();
  expect(getByTestId("description")).toHaveTextContent("This is a description");
  expect(getByTestId("component")).toHaveTextContent("This is a component");
  expect(getByTestId("references")).toHaveTextContent("This is a reference");
  expect(getByTestId("control-box-pass")).toHaveTextContent("Passed");
});
