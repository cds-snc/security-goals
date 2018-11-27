const { GraphQLList, GraphQLSchema, GraphQLObjectType } = require('graphql')
const { OpenControl } = require('./types/OpenControl')
const { ControlID } = require('./types/ControlID')
const { Totals } = require('./types/Totals')
const { filterItems } = require('./utils/filterItems')

// @todo
// const { dbConnect } = require('./db/connect')
// const db = await dbConnect()

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
  },
})

module.exports.schema = new GraphQLSchema({ query })
