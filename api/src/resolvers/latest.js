const { Release } = require('../types/Release')
const { GraphQLList } = require('graphql')
const { releaseModel } = require('../db/model')

// db query
const getLatestRelease = async () => {
  let match = {}

  const fields = {
    release: 1,
    timestamp: '$createdAt',
    passed: 1,
    passing: 1,
    total: 1,
    controls: 1,
  }

  const result = await releaseModel
    .aggregate([
      { $match: match },
      {
        $project: fields,
      },
      { $sort: { timestamp: -1 } },
      { $limit: 1 },
    ])
    .exec()

  return result
}

const latest = {
  description: 'Returns the latest release',
  type: new GraphQLList(Release),
  // eslint-disable-next-line no-unused-vars
  resolve: async root => {
    try {
      const releases = await getLatestRelease()
      return releases.filter(item => {
        // handle null release
        if (item.release) {
          return item
        }
      })
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.latest = latest
