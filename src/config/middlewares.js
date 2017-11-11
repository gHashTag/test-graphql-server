import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from '../graphql/schema'
import resolvers from '../graphql/resolvers'
import constants from './constants'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default app => {
  app.use(bodyParser.json()) // add body-parser as the json parser middleware
  app.use('/graphiql', graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
  }))

  app.use(
    constants.GRAPHQL_PATH, 
    graphqlExpress(req => ({
      schema,
      context: {
        event: req.event
      }
    }))
  )
}
