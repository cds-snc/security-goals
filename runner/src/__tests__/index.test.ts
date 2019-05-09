process.env.WEBHOOK_URL = "foo";

import request from "supertest";
import { app } from "../index";
import { runJobs } from "../lib/runJobs";

jest.mock("../lib/runJobs", () => ({
  runJobs: jest.fn()
}));

test("returns a 200 and yes repsonse for the alive route", async () => {
  await request(app)
    .get("/alive")
    .expect(200)
    .expect("yes");
});

test("returns a 200 and yes repsonse for the ready route", async () => {
  await request(app)
    .get("/ready")
    .expect(200)
    .expect("yes");
});

test("sets up an arbitrary endpoint to restart jobs", async () => {
  await request(app)
    .post("/foo")
    .expect(200)
    .expect("Running jobs");
});

test("calls the runJobs function when hitting the endpoint", async () => {

  await request(app)
    .post("/foo")
    .expect(200)
    .expect("Running jobs");

  expect(runJobs).toHaveBeenCalledTimes(1);
});

