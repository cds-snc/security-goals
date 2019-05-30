const { Release } = require("../types/Release");
const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require("graphql");

const { releaseModel } = require("../db/model");

const ReleaseType = new GraphQLEnumType({
  name: "ReleaseType",
  values: {
    ALL: { value: "all" },
    PASSING: { value: "passing" },
    FAILING: { value: "failing" },
  },
});

// db query
const getRelease = async ({
  releaseId = "",
  limit = 10000,
  releaseType = "all",
  withControls = false,
}) => {
  let match = {};

  if (releaseId) {
    match = { release: releaseId };
  }

  if (releaseType === "failing") {
    match = { ...match, passed: false };
  }

  if (releaseType === "passing") {
    match = { ...match, passed: true };
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
    releaseType: {
      type: ReleaseType,
      description:
        "optional release type - what type of releases do you want to return",
    },
    limit: {
      type: GraphQLInt,
      description: "maximum number of releases to pull",
    },
  },
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { releaseId, limit, releaseType }, context, info) => {
    try {
      const withControls = true;
      const releases = await getRelease({
        releaseId,
        limit,
        releaseType,
        withControls,
      });
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
