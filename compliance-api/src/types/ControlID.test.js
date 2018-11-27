const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const { ControlID } = require('../types/ControlID.js')

var testSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: {
      test: {
        type: GraphQLString,
        args: {
          id: {
            type: new GraphQLNonNull(ControlID),
          },
        },
        resolve: (_source, { id }, _root, _ast) => {
          return id
        },
      },
    },
  }),
})

describe('ControlID type', () => {
  describe('parseLiteral', () => {
    it('accepts control ids as literals', async () => {
      let query = `{
         test(id: "SA-11 (1)")
        }`

      let results = await graphql(testSchema, query)
      expect(results.data.test).toEqual('SA-11 (1)')
    })

    it('rejects malformed id literals', async () => {
      let query = `{
         test(id: "asdfasdf")
        }`

      let results = await graphql(testSchema, query)
      expect(results).toHaveProperty('errors')
    })
  })

  describe('parseValue', () => {
    it('accepts properly formatted id values', async () => {
      let query = `query test($id: ControlID!) {
         test(id: $id)
        }`

      let results = await graphql(
        testSchema,
        query,
        {},
        {},
        {
          id: 'SA-11 (1)',
        },
      )
      expect(results.data.test).toEqual('SA-11 (1)')
    })

    it('rejects malformed control id values', async () => {
      let query = `query test($id: ControlID!) {
         test(id: $id)
        }`

      let results = await graphql(
        testSchema,
        query,
        {},
        {},
        {
          id: 'asdfadgf-10120',
        },
      )
      expect(results).toHaveProperty('errors')
    })
  })
})
