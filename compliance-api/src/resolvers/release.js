const { getRelease } = require('../db/queries')
const { Release } = require('../types/Release')
const { GraphQLString } = require('graphql')

const release = {
  description: 'Returns details for a single release',
  type: Release,
  args: {
    id: {
      type: GraphQLString,
      description: 'The id of the control to return.',
    },
  },
  resolve: async (root, { id }) => {
    try {
      const result = await getRelease(id)
      return result[0]
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.release = release
