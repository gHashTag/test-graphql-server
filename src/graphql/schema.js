export default`
  type Status {
    message: String!
  }

  type Master {
    _id: ID!
    title: String
    events: [Event]
  }

  type Event {
    _id: ID 
    title: String
    masters: [Master]
  }

  type Query {
    getMaster(_id: ID!): Master 
    getMasters: [Master] 
    getEvent(_id: ID!): Event 
    getEvents: [Event] 
  }

  type Mutation {
    createMaster(
      title: String
    ): Master 

    createEvent(
      title: String, 
      masters: ID!
    ): Event 
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
