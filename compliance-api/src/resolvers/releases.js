const { Release } = require('../types/Release')
const { GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const { releaseModel } = require('../db/model')
const chalk = require('chalk')
const log = console.log

const note = message => {
  log(chalk.black.bgGreen('\n\n' + message))
}

// db query
const getRelease = async ({ releaseId = '', limit = 10000 }) => {
  let match = {}
  if (releaseId) {
    match = { release: releaseId }
  }

  note(`=== get release(s) ${releaseId} ===`)
  const result = await releaseModel
    .aggregate([
      { $match: match },
      {
        $project: {
          release: 1,
          timestamp: '$createdAt',
          passed: 1,
          controls: 1,
          passing: 1,
          total: 1,
        },
      },
      { $sort: { timestamp: -1 } },
      { $limit: limit },
    ])
    .exec()

  return result
}

const releases = {
  description: 'Returns a list of releases',
  type: new GraphQLList(Release),
  args: {
    releaseId: {
      type: GraphQLString,
      description: 'optional release id to limit to specific release',
    },
    limit: {
      type: GraphQLInt,
      description: 'maximum number of releases to pull',
    },
  },
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { releaseId, limit }, context, info) => {
    try {
      // @todo
      /* 
      parse info object to change the database projection 
      based on fields requested i.e. if user doesn't request controls
      don't query the database for it
      */

      //https://github.com/alekbarszczewski/graphql-query-tree

      return await getRelease({ releaseId, limit })
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
