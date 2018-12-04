const { getControl } = require('../db/queries')
const { Release } = require('../types/Release')
const { GraphQLString } = require('graphql')

/*
{
  release(id: "80e61288-ef33-11e8-908e-06d86cf01138") {
    passed
    passing
    total
    controls {
      fileId
      control
      verifications {
        origin
        timestamp
        passed
        description
        component
        references
      }
    }
  }
}
*/

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
      return await getReleaseControls(id)
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.release = release
