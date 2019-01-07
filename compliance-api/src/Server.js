const cors = require('cors')
require('isomorphic-fetch')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { schema } = require('./schema')

const Server = compliancePosture => {
  let server = express()

  server.get('/monitoring/alive', (_req, res) => {
    res.status(200).send('yes')
  })

  server.get('/monitoring/ready', (_req, res) => {
    res.status(200).send('yes')
  })

  server.use(cors())
  server.use(
    '/',
    graphqlHTTP({ schema, graphiql: true, rootValue: compliancePosture }),
  )
  return server
}

module.exports.Server = Server
