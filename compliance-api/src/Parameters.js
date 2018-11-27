const { GraphQLObjectType, GraphQLString } = require('graphql')

const Parameters = new GraphQLObjectType({
  name: 'Parameters',
  description: 'OpenControl Parameters Type',
  fields: () => ({
    key: { description: 'key', type: GraphQLString },
    text: {
      description: 'text',
      type: GraphQLString,
    },
  }),
})

module.exports.Parameters = Parameters
