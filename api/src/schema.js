const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { controls } = require("./resolvers/controls");
const { controlReleases } = require("./resolvers/controlReleases");
const { releases } = require("./resolvers/releases");
const { latest } = require("./resolvers/latest");
const { releasesMinMax } = require("./resolvers/releaseDates");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    controls,
    controlReleases,
    releases,
    latest,
    releasesMinMax,
  },
});

module.exports.schema = new GraphQLSchema({ query });
