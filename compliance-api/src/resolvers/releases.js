const { Release } = require('../types/Release')
const { getRelease } = require('../db/queries')
const { GraphQLList } = require('graphql')

const releases = {
  description: 'Returns a list of releases',
  type: new GraphQLList(Release),
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { id }, context, info) => {
    try {
      /*
      const requested_attributes = info.fieldNodes[0].selectionSet.selections.map(
        ({ name: { value } }) => value,
      )

      if (requested_attributes.includes('controls')) {
        console.log('get controls')
      }
      */

      return await getRelease()
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
