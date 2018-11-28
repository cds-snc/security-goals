import { cleanup } from "react-testing-library";
import { chunkArray, verificationsData } from "../../util";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("ChunkArray", async () => {
  const result = chunkArray([1, 2, 3], 1);
  expect(result).toEqual([[1], [2], [3]]);
});

test("VerificationsData", async () => {
  expect(verificationsData()).toMatchObject({ items: [] });
});
