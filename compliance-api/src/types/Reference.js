const { GraphQLObjectType, GraphQLString } = require('graphql')

const Reference = new GraphQLObjectType({
  name: 'Reference',
  description: 'OpenControl Reference Type',
  fields: () => ({
    name: { description: 'name', type: GraphQLString },
    path: {
      description: 'path',
      type: GraphQLString,
    },
    type: {
      description: 'reference type',
      type: GraphQLString,
    },
  }),
})

module.exports.Reference = Reference
