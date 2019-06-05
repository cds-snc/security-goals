import { Release } from "../types/Release";
import { GraphQLList, GraphQLString, GraphQLInt } from "graphql";
import { releaseModel } from "../db/model";
import {
  GraphQLReleaseType,
  ReleaseTypeValue,
} from "../interfaces/ReleaseType";

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
    controls: 1,
  };

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
      type: GraphQLReleaseType,
      description:
        "optional release type - what type of releases do you want to return",
    },
    limit: {
      type: GraphQLInt,
      description: "maximum number of releases to pull",
    },
  },
  // eslint-disable-next-line no-unused-vars
  resolve: async (
    root,
    {
      releaseId,
      limit,
      releaseType,
    }: { releaseId: string; limit: number; releaseType: ReleaseTypeValue },
    context,
    info,
  ) => {
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
