const cors = require('cors')
require('isomorphic-fetch')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { schema } = require('./schema')

const Server = compliancePosture => {
  let server = express()
  server.use(cors())
  //compliancePosture
  server.use('/', graphqlHTTP({ schema, graphiql: true, rootValue: {} }))
  return server
}

module.exports.Server = Server
