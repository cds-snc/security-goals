const { GraphQLList, GraphQLSchema, GraphQLObjectType } = require('graphql')
const { OpenControl } = require('./types/OpenControl')
const { ControlID } = require('./types/ControlID')
const { Totals } = require('./types/Totals')
const { ControlReleases } = require('./types/ControlReleases')
const { filterItems } = require('./utils/filterItems')
const { check } = require('./db/model')

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
    controlReleases: {
      description: 'Returns a list of releases for a control',
      type: ControlReleases,
      args: {
        id: {
          type: ControlID,
          description: 'The id of the control to return.',
        },
      },
      // eslint-disable-next-line no-unused-vars
      resolve: async (root, { id }) => {
        try {
          const result = await check
            .find({ control: id }, [
              'release',
              'control',
              'timestamp',
              'component',
              'origin',
              'passed',
              'description',
              'references',
            ])
            .sort({ timestamp: -1 })
            .lean()
            .exec()
          return { releases: result }
        } catch (e) {
          console.log(e.message)
        }
      },
    },
  },
})

/*
{
  control(id:"CM-8 (1)"){
    family
    name
    description
  }
  controlReleases(id: "CM-8 (1)") {
    releases {
      _id
      release
      control
      timestamp
      origin
      passed
      description
      references
    }
  }
}
*/

module.exports.schema = new GraphQLSchema({ query })
