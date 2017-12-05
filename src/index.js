import express from 'express'
import { createServer } from 'http'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import './config/db'
import middlewares from './config/middlewares'
//import constants from './config/constants'

import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

const app = express() // create an instance of express

const PORT = 3000

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
}) 

middlewares(app)

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions` 
}))

app.use('/graphql', graphqlExpress(req => ({
  schema,
  context: {
    studio: req.studio
  }
}))
)

const graphQLServer = createServer(app)

graphQLServer.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    new SubscriptionServer({ // eslint-disable-line
      schema,
      execute,
      subscribe
    }, {
      server: graphQLServer,
      path: '/subscriptions'
    })
    console.log(`Наша йога на порту: ${PORT}`)
  }
})
