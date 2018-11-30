const {
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql')
const { OpenControl } = require('./types/OpenControl')
const { ControlID } = require('./types/ControlID')
const { Totals } = require('./types/Totals')
const { filterItems } = require('./utils/filterItems')
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
    verifiedControls: {
      description: 'Returns a list of passing controls',
      type: new GraphQLList(OpenControl),
      resolve: root => {
        return filterItems(root, true)
      },
    },
    failedControls: {
      description: 'Returns a list of failing controls',
      type: new GraphQLList(OpenControl),
      resolve: root => {
        return filterItems(root, false)
      },
    },
    control: {
      description: 'Returns details for a single control',
      type: OpenControl,
      args: {
        id: {
          type: ControlID,
          description: 'The id of the control to return.',
        },
      },
      resolve: (root, { id }) => {
        return root[id]
      },
    },
    totals: {
      description: 'Returns a list of failing controls',
      type: Totals,
      resolve: root => {
        const passed = filterItems(root, true)
        const failed = filterItems(root, false)
        const items = [...passed, ...failed]
        const total = [...new Set(items.map(item => item.id))].length
        return { passed: passed.length, total }
      },
    },
    release,
    releases,
  },
})

module.exports.schema = new GraphQLSchema({ query })
