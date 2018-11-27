const { GraphQLObjectType, GraphQLString } = require('graphql')
const { CoveredBy } = require('./CoveredBy')
const { Reference } = require('./Reference')
const { Parameters } = require('./Parameters')
const { Narrative } = require('./Narrative')

const SatisfactionCriteria = new GraphQLObjectType({
  name: 'SatisfactionCriteria',
  description: 'OpenControl SatisfactionCriteria Type',
  fields: () => ({
    control_key: { description: 'control_key', type: GraphQLString },
    covered_by: {
      description: 'coveredBy',
      type: CoveredBy,
    },
    implementation_statuses: {
      description: 'implementationStatuses',
      type: GraphQLString,
    },
    references: {
      description: 'references',
      type: Reference,
    },
    control_origins: {
      description: 'references',
      type: GraphQLString,
    },
    narrative: {
      description: 'narrative',
      type: Narrative,
    },
    parameters: {
      description: 'parameters ',
      type: Parameters,
    },
    standard_key: {
      description: 'standardKey',
      type: GraphQLString,
    },
  }),
})

module.exports.SatisfactionCriteria = SatisfactionCriteria
