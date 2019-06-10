import { Release } from "../types/Release";
import { GraphQLList, GraphQLString, GraphQLInt } from "graphql";
import { releaseModel } from "../db/model";
import { GraphQLReleaseType, ReleaseType } from "../interfaces/ReleaseType";

const toDate = (date: string) => new Date(date);

const defaultEndDate = () => {
  const date = new Date();
  const month = date.getUTCMonth() + 1; //months from 1-12
  const day = date.getUTCDate();
  const year = date.getUTCFullYear() + 1; // One year ahead

  return `${year}-${month}-${day}`;
};

// db query
const getRelease = async ({
  releaseId = "",
  limit = 10000,
  releaseType = "all",
  startDate = "2018-01-01",
  endDate = defaultEndDate(),
  withControls = false,
}) => {
  let match = {};

  if (releaseId) {
    match = { ...match, release: releaseId };
  }

  if (releaseType === "failing") {
    match = { ...match, passed: false };
  }

  if (releaseType === "passing") {
    match = { ...match, passed: true };
  }

  //set the date range
  match = {
    ...match,
    releaseTimeStamp: {
      $gte: toDate(startDate),
      $lte: toDate(endDate),
    },
  };

  const fields = {
    release: 1,
    timestamp: "$createdAt",
    passed: 1,
    passing: 1,
    total: 1,
    releaseTimeStamp: 1,
    formattedReleaseTimeStamp: {
      $dateToString: { format: "%H:%M:%S %d-%m-%Y", date: "$releaseTimeStamp" },
    },
    controls: 1,
  };

  const result = await releaseModel
    .aggregate([
      { $match: match },
      {
        $project: fields,
      },
      { $sort: { releaseTimeStamp: -1 } },
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
    startDate: {
      type: GraphQLString,
      description: "optional start date in YYY-MM-DD format",
    },
    endDate: {
      type: GraphQLString,
      description: "optional end date in YYY-MM-DD format",
    },
  },
  // eslint-disable-next-line no-unused-vars
  resolve: async (
    root,
    {
      releaseId,
      limit,
      releaseType,
      startDate,
      endDate,
    }: {
      releaseId: string;
      limit: number;
      releaseType: ReleaseType;
      startDate: string;
      endDate: string;
    },
    context,
    info,
  ) => {
    try {
      const withControls = true;
      const releases = await getRelease({
        releaseId,
        limit,
        releaseType,
        startDate,
        endDate,
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
