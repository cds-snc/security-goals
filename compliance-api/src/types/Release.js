const { GraphQLObjectType, GraphQLString } = require('graphql')
const GraphQLObjectId = require('graphql-scalar-objectid')

const Release = new GraphQLObjectType({
  name: 'Release',
  description: 'Release Type',
  fields: () => ({
    _id: {
      description: 'id',
      type: GraphQLObjectId,
    },
    release: { description: 'the release', type: GraphQLString },
    control: { description: 'control id', type: GraphQLString },
    timestamp: { description: 'timestamp', type: GraphQLString },
    origin: {
      description: 'name of the container than ran the check',
      type: GraphQLString,
    },
    passed: {
      description: 'whether or not the check passed',
      type: GraphQLString,
    },
    description: {
      description: 'description',
      type: GraphQLString,
    },
    references: {
      description: 'references',
      type: GraphQLString,
    },
  }),
})

module.exports.Release = Release
