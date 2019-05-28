import nock from "nock";
import { fetchControls, fetchRelease } from "../../lib/fetchRelease";

test("fetchRelease and fetchControls returns false if no process.env.API_URL is defined", async () => {
  delete process.env.API_URL;
  const releaseResult = await fetchRelease();
  expect(releaseResult).toEqual(false);

  const fetchResult = await fetchControls();
  expect(fetchResult).toEqual(false);
});

test("fetchRelease returns the latest release object if no id is passed", async () => {
  process.env.API_URL = "http://foo";

  nock(process.env.API_URL).persist().post("/", '{"query":"query{releases{release}}"}').reply(200, {
    data: {
      releases: [ { release: "2011801ed6bc445e530290ebe9d5774cd542f2f7-1558915258476" } ]
    }
  });

  nock(process.env.API_URL)
    .persist()
    .post(
      "/",
      '{"query":"{\\n    releases(releaseId: \\"2011801ed6bc445e530290ebe9d5774cd542f2f7-1558915258476\\") {\\n      release\\n      timestamp\\n      passed\\n      passing\\n      total\\n      controls {\\n        control\\n        verifications {\\n          origin\\n          timestamp\\n          passed\\n          description\\n          component\\n          references\\n        }\\n      }\\n    }\\n  }"}'
    )
    .reply(200, {data: {releases: []}});

  const releaseResult = await fetchRelease();
  expect(releaseResult).not.toEqual(false);
});

test("fetchControls returns all controls in the API", async () => {
  process.env.API_URL = "http://foo";

  nock(process.env.API_URL)
    .persist()
    .post(
      "/",
      '{\"query\":\"{controls{id name description}}\"}'
    )
    .reply(200, {"data":{"controls":[{"id":"AC-1","name":"Access Control Policy And Procedures","description":"DESC"}]}});

  const controlResult = await fetchControls();
  console.log(controlResult)
  expect(controlResult).not.toEqual(false);
  expect(controlResult.hasOwnProperty("AC-1")).toEqual(true);
});
