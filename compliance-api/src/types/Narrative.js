const { GraphQLObjectType, GraphQLString } = require('graphql')

const Narrative = new GraphQLObjectType({
  name: 'Narrative',
  description: 'OpenControl Narrative Type',
  fields: () => ({
    key: { description: 'key', type: GraphQLString },
    text: {
      description: 'text',
      type: GraphQLString,
    },
  }),
})

module.exports.Narrative = Narrative
