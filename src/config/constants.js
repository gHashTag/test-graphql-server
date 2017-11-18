export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://nodkz:nodkz@ds111876.mlab.com:11876/io',
  // DB_URL: 'mongodb://localhost/twitter',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'thisissecret123'
}
