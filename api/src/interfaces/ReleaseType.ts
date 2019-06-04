const { GraphQLEnumType } = require("graphql");

export const ReleaseType = new GraphQLEnumType({
  name: "ReleaseType",
  values: {
    ALL: { value: "all" },
    PASSING: { value: "passing" },
    FAILING: { value: "failing" },
  },
});
