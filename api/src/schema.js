const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { controls } = require("./resolvers/controls");
const { controlReleases } = require("./resolvers/controlReleases");
const { releases } = require("./resolvers/releases");
const { latest } = require("./resolvers/latest");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    controls,
    controlReleases,
    releases,
    latest,
  },
});

module.exports.schema = new GraphQLSchema({ query });
