const { GraphQLEnumType } = require("graphql");

export const GraphQLReleaseType = new GraphQLEnumType({
  name: "ReleaseType",
  values: {
    ALL: { value: "all" },
    PASSING: { value: "passing" },
    FAILING: { value: "failing" },
  },
});

export type ReleaseTypeValue = "all" | "passing" | "failing";
