export default`
  scalar Date 

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type Studio {
    _id: ID!
    studioname: String
    email: String!
    avatar: String!
    address: String!
    city: String!
    phone: String!
    contactName: String!
    createdAt: Date! 
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    studioname: String
    email: String!
    avatar: String!
    address: String!
    city: String!
    phone: String!
    contactName: String!
    createdAt: Date! 
    updatedAt: Date!
  }

  type Tweet {
    _id: ID! 
    text: String!
    studio: Studio!
    favoriteCount: Int!
    createdAt: Date! 
    updatedAt: Date!
  }

  type Query {
    getTweet(_id: ID!): Tweet 
    getTweets: [Tweet]
    getStudioTweets: [Tweet]
    me: Me
  }

  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    signup(
      studioname: String!, 
      email: String!, 
      password: String!, 
      avatar: String, 
      address: String!, 
      city: String!, 
      phone: String!, 
      contactName: String!
    ): Auth 
    login(
      email: String!
      password: String!
    ): Auth 
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
