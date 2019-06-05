import { getControl } from "../db/queries";
import { ControlReleases } from "../types/ControlReleases";
import { GraphQLString } from "graphql";
import {
  GraphQLReleaseType,
  ReleaseTypeValue,
} from "../interfaces/ReleaseType";
/*
{
  controlReleases(id: "SA-11 (1)"){
     releases{
      release
      passed
      timestamp
      total
    }
  }  
}
*/

const filterVerifications = (results, releaseType: ReleaseTypeValue) => {
  let filter = false;
  let filterBoolean = null;

  if (releaseType === "passing" || releaseType === "failing") {
    filter = true;

    if (releaseType === "passing") {
      filterBoolean = true;
    } else if (releaseType === "failing") {
      filterBoolean = false;
    }
  }

  results.map(item => {
    if (filter) {
      if (item.controls.verifications[0].passed === filterBoolean) {
        item.controls = [item.controls];
      } else {
        item.controls = [];
      }
    } else {
      item.controls = [item.controls];
    }
  });

  // remove results with empty controls array
  const filtered = results.filter(item => {
    if (item.controls.length >= 1) {
      return true;
    }
  });

  return filtered;
};

const controlReleases = {
  description: "Returns a single control and all the releases",
  type: ControlReleases,
  args: {
    id: {
      type: GraphQLString,
      description: "return a single control",
    },
    releaseType: {
      type: GraphQLReleaseType,
      description:
        "optional release type - what type of releases do you want to return",
    },
  },
  resolve: async (
    root,
    { id, releaseType }: { id: string; releaseType: ReleaseTypeValue },
  ) => {
    // eslint-disable-line no-unused-vars
    try {
      const results = await getControl(id);
      const filtered = filterVerifications(results, releaseType);
      return { releases: filtered };
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports.controlReleases = controlReleases;
