const { Release } = require("../types/Release");
const { GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { releaseModel } = require("../db/model");

// db query
const getRelease = async ({
  releaseId = "",
  limit = 10000,
  withControls = false,
}) => {
  let match = {};
  if (releaseId) {
    match = { release: releaseId };
  }

  const fields = {
    release: 1,
    timestamp: "$createdAt",
    passed: 1,
    passing: 1,
    total: 1,
  };

  // include the control field if requested in the query
  if (withControls) {
    fields.controls = 1;
  }

  const result = await releaseModel
    .aggregate([
      { $match: match },
      {
        $project: fields,
      },
      { $sort: { timestamp: -1 } },
      { $limit: limit },
    ])
    .exec();

  return result;
};

const releases = {
  description: "Returns a list of releases",
  type: new GraphQLList(Release),
  args: {
    releaseId: {
      type: GraphQLString,
      description: "optional release id to limit to specific release",
    },
    limit: {
      type: GraphQLInt,
      description: "maximum number of releases to pull",
    },
  },
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { releaseId, limit }, context, info) => {
    try {
      const withControls = true;
      const releases = await getRelease({ releaseId, limit, withControls });
      return releases.filter(item => {
        // handle null release
        if (item.release) {
          return item;
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports.releases = releases;
