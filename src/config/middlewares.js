import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import graphqlSchema from '../graphql/schema'
import constants from './constants'


export default app => {
  app.use(bodyParser.json()) // add body-parser as the json parser middleware
  app.use('/graphiql', graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
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
}
