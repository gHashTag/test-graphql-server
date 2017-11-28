import express from 'express'
import { createServer } from 'http'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import graphqlSchema from './graphql/schema'

import './config/db'
import constants from './config/constants'
import middlewares from './config/middlewares'

const app = express() // create an instance of express

middlewares(app)

app.use('/graphiql', graphiqlExpress({
  endpointURL: constants.GRAPHQL_PATH,
  subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}` 
}))

app.use(
  constants.GRAPHQL_PATH, 
  graphqlExpress(req => ({
    schema: graphqlSchema,
    context: {
      event: req.event
    }
  }))
)

const graphQLServer = createServer(app)

graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err)
  } else {
    new SubscriptionServer({ // eslint-disable-line
      schema: graphqlSchema,
      execute,
      subscribe
    }, {
      server: graphQLServer,
      path: constants.SUBSCRIPTIONS_PATH
    })
    console.log(`App listen on port: ${constants.PORT}`)
  }
})
