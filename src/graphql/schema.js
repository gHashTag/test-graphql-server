export default`
  type Status {
    message: String!
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    cars: [Car]
  }

  type Car {
    _id: ID 
    make: String
    model: String
    year: String
    seller: User
  }

  type Query {
    getUser(_id: ID!): User 
    getUsers: [User] 
    getCar(_id: ID!): Car 
    getCars: [Car] 
  }

  type Mutation {
    createUser(firstName: String, lastName: String, email: String): User 
    createCar(_id: ID!, make: String, model: String, year: String): Car 
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
