process.env.WEBHOOK_URL = "foo";

import request from "supertest";
import { app } from "../index";

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