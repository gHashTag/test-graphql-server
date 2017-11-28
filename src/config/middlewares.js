import bodyParser from 'body-parser'

export default app => {
  app.use(bodyParser.json()) // add body-parser as the json parser middleware
}
