import {getControls, setInitialWeight} from "../../util/controls";

describe("getControls", () => {
  test("returns a unique set of controls", () => {
    const data = [{"timestamp":"1559606590784","controls":[{"control":"CM-2","verifications":[{"passed":"true"}]},{"control":"AU-8","verifications":[{"passed":"true"}]},{"control":"AU-8 (1)","verifications":[{"passed":"true"}]},{"control":"SI-11","verifications":[{"passed":"true"}]}]}]
    const expected = ["CM-2", "AU-8", "AU-8 (1)", "SI-11"];
    expect(getControls(data)).toEqual(expected)
  });
});

describe("setInitialWeight", () => {
  test("creates a weighting object where controls are set to one", () => {
    const data = ["CM-2", "AU-8", "AU-8 (1)", "SI-11"];
    const expected = {"AU-8": 1, "AU-8 (1)": 1, "CM-2": 1, "SI-11": 1};
    expect(setInitialWeight(data)).toEqual(expected)
  });
});

