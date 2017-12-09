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

  type Master {
    _id: ID! 
    title: String!
    subtitle: String!
    img: String!
    info: String!
    studio: Studio!
    createdAt: Date! 
    updatedAt: Date!
  }

  type Service {
    _id: ID! 
    title: String!
    subtitle: String!
    img: String!
    info: String!
    studio: Studio!
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

    getMaster(_id: ID!): Master 
    getMasters: [Master]
    getStudioMasters: [Master]

    getService(_id: ID!): Service 
    getServices: [Service]
    getStudioServices: [Service]

    me: Me
  }

  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status

    createMaster( 
      title: String!, 
      subtitle: String!, 
      img: String!, 
      info: String!
    ): Master 
    updateMaster(
      _id: ID!, 
      title: String!, 
      subtitle: String!, 
      img: String!, 
      info: String!
    ): Master 
    deleteMaster(_id: ID!): Status

    createService( 
      title: String!, 
      subtitle: String!, 
      img: String!, 
      info: String!
    ): Service 
    updateService(
      _id: ID!, 
      title: String!, 
      subtitle: String!, 
      img: String!, 
      info: String!
    ): Service 
    deleteService(_id: ID!): Status

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

  type Subscription {
    masterAdded: Master 
    masterUpdated: Master
    masterDeleted: Master

    serviceAdded: Service 
    serviceUpdated: Service 
    serviceDeleted: Service 
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`
