export default`
  scalar Date 

  type Status {
    message: String!
  }

  type Master {
    _id: ID!
    title: String
    eventslink: [Event]
  }

  type Event {
    _id: ID 
    title: String
    event_times: [Date!]!
    masterlink: Master
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
      event_times: [Date!]!,
      masterlink: ID!, 
    ): Event 
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
