const { GraphQLObjectType, GraphQLList, GraphQLString, G } = require('graphql')
const { Verification } = require('./Verification')

const Control = new GraphQLObjectType({
  name: 'Control',
  description: 'Control Type',
  fields: () => ({
    control: {
      description: 'name',
      type: GraphQLString,
    },
    fileId: {
      description: 'name',
      type: GraphQLString,
    },
    verifications: {
      description: 'verifications',
      type: new GraphQLList(Verification),
    },
  }),
})

module.exports.Control = Control
