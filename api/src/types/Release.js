const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const GraphQLObjectId = require('graphql-scalar-objectid')
const { Control } = require('./Control')
const Release = new GraphQLObjectType({
  name: 'Release',
  description: 'Release Type',
  fields: () => ({
    _id: {
      description: 'release id',
      type: GraphQLObjectId,
    },
    release: { description: 'release sha', type: GraphQLString },
    timestamp: { description: 'timestamp', type: GraphQLString },
    controls: { description: 'timestamp', type: new GraphQLList(Control) },
    passed: {
      description: 'status to determine if all controls for the release passed',
      type: GraphQLString,
    },
    passing: {
      description: 'how many controls passed',
      type: GraphQLString,
    },
    total: {
      description: 'how many total controls',
      type: GraphQLString,
    },
  }),
})

module.exports.Release = Release
