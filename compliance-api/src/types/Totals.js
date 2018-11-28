const { GraphQLObjectType, GraphQLInt } = require('graphql')

const Totals = new GraphQLObjectType({
  name: 'Totals',
  description: 'Total Type',
  fields: () => ({
    passed: {
      description: 'passed',
      type: GraphQLInt,
    },
    total: {
      description: 'total',
      type: GraphQLInt,
    },
  }),
})

module.exports.Totals = Totals
