import nock from "nock";
import { executeWebhook } from "../../lib/executeWebhook";

const scope = nock("https://foo")
  .persist()
  .post("/bar")
  .reply(200);

test("does not execute the URL ", async () => {
  delete process.env.CALLBACK_WEBHOOK;
  await executeWebhook();
  expect(scope.pendingMocks().length).toEqual(1);
});

test("executes the URL callback", async () => {
  process.env.CALLBACK_WEBHOOK = "https://foo/bar";
  await executeWebhook();
  expect(scope.pendingMocks().length).toEqual(0);
});
