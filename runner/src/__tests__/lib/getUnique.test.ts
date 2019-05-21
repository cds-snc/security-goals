import { getUniqueName, uniqueArray } from "../../lib/getUnique";

test("returns a string with random number removed", async () => {
  const name = getUniqueName("au-8-1-security-goals-auto-1558459587082");
  expect(name).toEqual("au-8-1-security-goals-auto");
});

test("returns a uniqueArray ", async () => {
  const arr = [
    { metadata: { name: "au-8-1-security-goals-auto-123" } },
    { metadata: { name: "au-8-1-security-goals-auto-123" } },
    { metadata: { name: "au-8-1-security-goals-auto-456" } }
  ];
  const unique = uniqueArray(arr);
  expect(unique.length).toEqual(1);
});
