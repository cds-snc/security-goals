const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql')
const { Verification } = require('./Verification')

const OpenControl = new GraphQLObjectType({
  name: 'OpenControl',
  description: 'OpenControl Type',
  fields: () => ({
    id: {
      description: 'control id',
      type: GraphQLString,
    },
    name: {
      description: 'name',
      type: GraphQLString,
    },
    family: {
      description: 'family',
      type: GraphQLString,
    },
    description: {
      description: 'a description of the control',
      type: GraphQLString,
    },
    verifications: {
      description: 'verifications',
      type: new GraphQLList(Verification),
    },
  }),
})

module.exports.OpenControl = OpenControl
