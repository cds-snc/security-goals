import { cleanup } from "react-testing-library";
import { chunkArray } from "../../util";
import "jest-dom/extend-expect";

afterEach(cleanup); // <-- add this

test("ChunkArray", async () => {
  const result = chunkArray([1, 2, 3], 1);
  expect(result).toEqual([[1], [2], [3]]);
});
