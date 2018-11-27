const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

const ControlID = new GraphQLScalarType({
  name: 'ControlID',
  description: 'The identifier for a given control',
  serialize: String,
  parseValue: value => {
    if (typeof value !== 'string') {
      return new GraphQLError('ControlID must be a string')
    }

    // Must be within range
    if (value.match(/(^\w{1,2}-\d{1,2}$|^\w{1,2}-\d{1,2} \(\d{1,2}\)$)/)) {
      return value
    } else {
      return new GraphQLError('String supplied was not a ControlID')
    }
  },
  parseLiteral: ast => {
    let value = ast.value

    // Make sure this is a Float
    if (!(ast.kind === Kind.STRING)) {
      return new GraphQLError('ControlID must be a string')
    }

    // Must be within range
    if (value.match(/(^\w{1,2}-\d{1,2}$|^\w{1,2}-\d{1,2} \(\d{1,2}\)$)/)) {
      return value
    } else {
      return new GraphQLError('String supplied was not a ControlID')
    }
  },
})

module.exports.ControlID = ControlID
