export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/twitter',
  //DB_URL: 'mongodb://test:test@ds111876.mlab.com:11876/io',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'thisissecret123'
}
