const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");

const Verification = new GraphQLObjectType({
  name: "Verification",
  description: "OpenControl Verification Type",
  fields: () => ({
    origin: {
      description: "name of the container than ran the check",
      type: GraphQLString,
    },
    timestamp: { description: "time the check was run", type: GraphQLString },
    passed: {
      description: "whether or not the check passed",
      type: GraphQLString,
    },
    description: {
      description: "description",
      type: GraphQLString,
    },
    satisfies: {
      description: "which controls this check satisfies",
      type: new GraphQLList(GraphQLString),
    },
    release: {
      description: "release hash",
      type: GraphQLString,
    },
    component: {
      description: "component",
      type: GraphQLString,
    },
    references: {
      description: "references",
      type: GraphQLString,
    },
  }),
});

module.exports.Verification = Verification;
