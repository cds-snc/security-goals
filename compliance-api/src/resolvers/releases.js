const { Release } = require('../types/Release')
const { getAllReleases } = require('../db/queries')
const { GraphQLList } = require('graphql')

/*
{
  releases {
    release
    timestamp
    passed
    passing
    total
  }
}
*/

const releases = {
  description: 'Returns a list of releases',
  type: new GraphQLList(Release),
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { id }) => {
    try {
      return await getAllReleases()
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
