const { GraphQLObjectType, GraphQLList } = require("graphql");
const { Release } = require("./Release");

const ControlReleases = new GraphQLObjectType({
  name: "ControlReleases",
  description: "Control Release Type",
  fields: () => ({
    releases: {
      description: "list of releases",
      type: new GraphQLList(Release),
    },
  }),
});

module.exports.ControlReleases = ControlReleases;
