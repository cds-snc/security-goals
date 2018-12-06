const cors = require('cors')
require('isomorphic-fetch')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { schema } = require('./schema')

const Server = compliancePosture => {
  let server = express()
  server.use(cors())
  server.use(
    '/',
    graphqlHTTP({ schema, graphiql: true, rootValue: compliancePosture }),
  )
  return server
}

module.exports.Server = Server
