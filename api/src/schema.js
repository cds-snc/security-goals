const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { controls } = require('./resolvers/controls')
const { controlReleases } = require('./resolvers/controlReleases')
const { releases } = require('./resolvers/releases')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    controls,
    controlReleases,
    releases,
  },
})

module.exports.schema = new GraphQLSchema({ query })
