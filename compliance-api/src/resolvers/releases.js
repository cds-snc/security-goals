const { Release } = require('../types/Release')
const { GraphQLList, GraphQLString } = require('graphql')
const { releaseModel } = require('../db/model')
const chalk = require('chalk')
const log = console.log

const note = message => {
  log(chalk.black.bgGreen('\n\n' + message))
}

// db query
const getRelease = async (sha = '') => {
  let match = {}
  if (sha) {
    match = { release: sha }
  }

  note(`=== get release(s) ${sha} ===`)
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
    ])
    .exec()

  return result
}

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

      // add limit
      // add orderby timestamp

      //https://github.com/alekbarszczewski/graphql-query-tree

      return await getRelease(id)
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
