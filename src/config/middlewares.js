/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser'
import { decodeToken } from '../services/auth'

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization
    if (token != null) {
      const studio = await decodeToken(token)
      req.studio = studio 
    } else {
      req.studio = null
    }
    return next()
  } catch (error) {
    throw error
  }
}

export default app => {
  app.use(bodyParser.json()) // add body-parser as the json parser middleware
  app.use(auth)
}
