const { GraphQLObjectType, GraphQLString } = require('graphql')

const CoveredBy = new GraphQLObjectType({
  name: 'CoveredBy',
  description: 'OpenControl CoveredBy Type',
  fields: () => ({
    system_key: { description: 'system_key', type: GraphQLString },
    component_key: {
      description: 'component_key',
      type: GraphQLString,
    },
    verification_key: {
      description: 'verificationKey type',
      type: GraphQLString,
    },
  }),
})

module.exports.CoveredBy = CoveredBy
