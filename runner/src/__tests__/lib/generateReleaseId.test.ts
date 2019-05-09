import nock from "nock";
import { generateReleaseId } from "../../lib/generateReleaseId";

test("returns a date string if no GITHUB_REPO is defined", async () => {
    delete process.env.GITHUB_REPO;
    const result = await generateReleaseId();
    
    expect(result).not.toEqual(null);
    expect(result).not.toContain("-");
})

test("returns a date string with the SHA of master if a GitHub repo is defined", async () => {
    process.env.GITHUB_REPO = "foo/bar";

    nock("https://api.github.com/")
      .persist()
      .get("/repos/foo/bar/commits?branch=master")
      .reply(200, [{ sha: "abcd" }]);

    expect(await generateReleaseId()).toContain("abcd");
})