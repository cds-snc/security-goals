import { ReleasesMixMax } from "../types/ReleaseDates";
import { getMinMaxReleaseDates } from "../db/queries";

export const releasesMinMax = {
  description: "Returns min and max release dates",
  type: ReleasesMixMax,
  args: {},
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, {}, context, info) => {
    try {
      return await getMinMaxReleaseDates();
    } catch (e) {
      console.log(e);
    }
  },
};
