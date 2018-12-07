const { Release } = require('../types/Release')
const { GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
<<<<<<< HEAD
<<<<<<< HEAD
const GraphqlQueryTree = require('graphql-query-tree').default
=======
>>>>>>> add limit
const { releaseModel } = require('../db/model')

// db query
<<<<<<< HEAD
=======
const GraphqlQueryTree = require('graphql-query-tree').default
const { releaseModel } = require('../db/model')

// db query
>>>>>>> graph tree
const getRelease = async ({
  releaseId = '',
  limit = 10000,
  withControls = false,
}) => {
<<<<<<< HEAD
  let match = {}
  if (releaseId) {
    match = { release: releaseId }
  }

  const fields = {
    release: 1,
    timestamp: '$createdAt',
    passed: 1,
    passing: 1,
    total: 1,
  }

  // include the control field if requested in the query
  if (withControls) {
    fields.controls = 1
  }

=======
const getRelease = async ({ releaseId = '', limit = 10000 }) => {
=======
>>>>>>> graph tree
  let match = {}
  if (releaseId) {
    match = { release: releaseId }
  }

<<<<<<< HEAD
  note(`=== get release(s) ${releaseId} ===`)
>>>>>>> add limit
=======
  const fields = {
    release: 1,
    timestamp: '$createdAt',
    passed: 1,
    passing: 1,
    total: 1,
  }

  // include the control field if requested in the query
  if (withControls) {
    fields.controls = 1
  }

>>>>>>> graph tree
  const result = await releaseModel
    .aggregate([
      { $match: match },
      {
        $project: fields,
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
<<<<<<< HEAD
<<<<<<< HEAD
      const tree = new GraphqlQueryTree(info)
      const withControls = tree.isSelected('controls')
      return await getRelease({ releaseId, limit, withControls })
=======
      // @todo
      /* 
      parse info object to change the database projection 
      based on fields requested i.e. if user doesn't request controls
      don't query the database for it
      */

      //https://github.com/alekbarszczewski/graphql-query-tree

      return await getRelease({ releaseId, limit })
>>>>>>> add limit
=======
      const tree = new GraphqlQueryTree(info)
      const withControls = tree.isSelected('controls')
      return await getRelease({ releaseId, limit, withControls })
>>>>>>> graph tree
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
