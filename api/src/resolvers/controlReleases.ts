import { getControl } from "../db/queries";
import { ControlReleases } from "../types/ControlReleases";
import { GraphQLString } from "graphql";
import {
  VerificationStatus,
  GraphQLVerificationStatus,
} from "../interfaces/VerificationStatus";
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

const filterVerifications = (
  results,
  verificationStatus: VerificationStatus,
) => {
  let filter = false;
  let filterBoolean = null;

  if (verificationStatus === "passing" || verificationStatus === "failing") {
    filter = true;

    if (verificationStatus === "passing") {
      filterBoolean = true;
    } else if (verificationStatus === "failing") {
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
    verificationStatus: {
      type: GraphQLVerificationStatus,
      description:
        "optional status type - what type of verification to filter on",
    },
  },
  resolve: async (
    root,
    {
      id,
      verificationStatus,
    }: { id: string; verificationStatus: VerificationStatus },
  ) => {
    // eslint-disable-line no-unused-vars
    try {
      const results = await getControl(id);
      const filtered = filterVerifications(results, verificationStatus);
      return { releases: filtered };
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports.controlReleases = controlReleases;
