import express from 'express'
import { createServer } from 'http'

import './config/db'
import constants from './config/constants'
import middlewares from './config/middlewares'

const app = express() // create an instance of express

middlewares(app)

const graphQLServer = createServer(app)

graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`App listen on port: ${constants.PORT}`)
  }
})
