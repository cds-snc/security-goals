const { getControl } = require("../db/queries");
const { ControlReleases } = require("../types/ControlReleases");
const { GraphQLString } = require("graphql");
const { ReleaseType } = require("../interfaces/ReleaseType");
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

const controlReleases = {
  description: "Returns a single control and all the releases",
  type: ControlReleases,
  args: {
    id: {
      type: GraphQLString,
      description: "return a single control",
    },
    releaseType: {
      type: ReleaseType,
      description:
        "optional release type - what type of releases do you want to return",
    },
  },
  resolve: async (root, { id, releaseType }) => {
    // eslint-disable-line no-unused-vars
    try {
      const results = await getControl(id, releaseType);
      results.map(item => {
        item.controls = [item.controls];
      });

      return { releases: results };
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports.controlReleases = controlReleases;
