const { GraphQLEnumType } = require("graphql");

export const GraphQLVerificationStatus = new GraphQLEnumType({
  name: "VerificationStatus",
  values: {
    ALL: { value: "all" },
    PASSING: { value: "passing" },
    FAILING: { value: "failing" },
  },
});

export type VerificationStatus = "all" | "passing" | "failing";
