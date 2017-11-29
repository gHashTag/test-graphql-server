import express from 'express'
import { createServer } from 'http'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import './config/db'
import middlewares from './config/middlewares'
import constants from './config/constants'

import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

const app = express() // create an instance of express

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
}) 

middlewares(app)

app.use('/graphiql', graphiqlExpress({
  endpointURL: constants.GRAPHQL_PATH,
  subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}` 
}))

app.use(
  constants.GRAPHQL_PATH, 
  graphqlExpress(req => ({
    schema,
    context: {
      studio: req.studio
    }
  }))
)

const graphQLServer = createServer(app)

graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err)
  } else {
    new SubscriptionServer({ // eslint-disable-line
      schema,
      execute,
      subscribe
    }, {
      server: graphQLServer,
      path: constants.SUBSCRIPTIONS_PATH
    })
    console.log(`Наша йога на порту: ${constants.PORT}`)
  }
})
