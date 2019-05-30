const { getFiles } = require("../getFiles");

describe("getFiles", () => {
  it("returns an array of check objects from json files", async () => {
    let [check] = await getFiles("src/__tests__/testData/checks");
    expect(check.fileRef).toEqual("0-1542896172725");
  });

  it(`throws an error is the directory isn't readable`, async () => {
    try {
      await getFiles("asdfasdf");
    } catch ({ message }) {
      expect(message).toMatch(/isn't a readable directory/);
    }
  });
});
