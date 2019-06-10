const { GraphQLObjectType, GraphQLString } = require("graphql");

export const ReleasesMixMax = new GraphQLObjectType({
  name: "ReleasesMixMax",
  description:
    "Return min and max Release timestamp.  Helpful for date range queries",
  fields: () => ({
    min: {
      description: "timestamp - the earliest release timestamp",
      type: GraphQLString,
    },
    max: {
      description: "timestamp - the latest release timestamp",
      type: GraphQLString,
    },
  }),
});
