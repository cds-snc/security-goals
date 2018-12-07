const { GraphQLList } = require('graphql')
const { OpenControl } = require('../types/OpenControl')

const controls = {
  description: 'Returns a list of all controls',
  type: new GraphQLList(OpenControl),
  resolve: root => {
    return Object.keys(root).map(item => {
      return root[item]
    })
  },
}

module.exports.controls = controls
