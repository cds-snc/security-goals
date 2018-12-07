const { GraphQLList, GraphQLSchema, GraphQLObjectType } = require('graphql')
const { OpenControl } = require('./types/OpenControl')
const { filterItems } = require('./utils/filterItems')
const { controlReleases } = require('./resolvers/controlReleases')
const { release } = require('./resolvers/release')
const { releases } = require('./resolvers/releases')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    controls: {
      description: 'Returns a list of all controls',
      type: new GraphQLList(OpenControl),
      resolve: root => filterItems(root),
    },
    controlReleases,
    release,
    releases,
  },
})

module.exports.schema = new GraphQLSchema({ query })
