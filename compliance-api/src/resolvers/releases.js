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

const mapAttributes = (model, { fieldNodes }) => {
  // get the fields of the Model (columns of the table)
  const columns = new Set(Object.keys(model.rawAttributes))
  const requested_attributes = fieldNodes[0].selectionSet.selections.map(
    ({ name: { value } }) => value,
  )
  // filter the attributes against the columns
  return requested_attributes.filter(attribute => columns.has(attribute))
}

const releases = {
  description: 'Returns a list of releases',
  type: new GraphQLList(Release),
  // eslint-disable-next-line no-unused-vars
  resolve: async (root, { id }, context, info) => {
    try {
      const requested_attributes = info.fieldNodes[0].selectionSet.selections.map(
        ({ name: { value } }) => value,
      )

      if (requested_attributes.includes('controls')) {
        console.log('get controls')
      }

      return await getAllReleases()
    } catch (e) {
      console.log(e.message)
    }
  },
}

module.exports.releases = releases
