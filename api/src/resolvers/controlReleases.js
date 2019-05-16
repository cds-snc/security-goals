const { getControl } = require('../db/queries')
const { ControlReleases } = require('../types/ControlReleases')
const { GraphQLString } = require('graphql')
/*
{
  controlReleases(id: "SA-11 (1)"){
     releases{
      release
      passed
      timestamp
      total
    }
  }  
}
*/

const controlReleases = {
  description: 'Returns a single control and all the releases',
  type: ControlReleases,
  args: {
    id: {
      type: GraphQLString,
      description: 'return a single control',
    },
  },
  resolve: async (root, { id }) => {
    // eslint-disable-line no-unused-vars
    try {
      const results = await getControl(id)
      results.map(item => {
        item.controls = [item.controls]
      })

      return { releases: results }
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.controlReleases = controlReleases
