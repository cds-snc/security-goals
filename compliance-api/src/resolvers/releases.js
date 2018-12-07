const { Release } = require('../types/Release')
const { getRelease } = require('../db/queries')
const { GraphQLList, GraphQLString } = require('graphql')

const releases = {
  description: 'Returns a list of releases',
  type: new GraphQLList(Release),
  args: {
    id: {
      type: GraphQLString,
      description: 'optional release id to limit to specific release',
    },
  },
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { id }, context, info) => {
    try {
      // @todo
      /* 
      parse info object to change the database projection 
      based on fields requested i.e. if user doesn't request controls
      don't query the database for it
      */

      //https://github.com/alekbarszczewski/graphql-query-tree

      return await getRelease(id)
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
