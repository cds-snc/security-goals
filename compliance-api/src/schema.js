const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { controls } = require('./resolvers/controls')
const { controlReleases } = require('./resolvers/controlReleases')
const { release } = require('./resolvers/release')
const { releases } = require('./resolvers/releases')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    controls,
    controlReleases,
    release,
    releases,
  },
})

module.exports.schema = new GraphQLSchema({ query })
