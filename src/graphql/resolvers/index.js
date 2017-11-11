import UserResolvers from './user-resolvers'
import CarResolvers from './car-resolvers'

export default {
  Query: {
    getUser: UserResolvers.getUser,
    getUsers: UserResolvers.getUsers,
    getCar: CarResolvers.getCar,
    getCars: CarResolvers.getCars
  },

  Mutation: {
    createUser: UserResolvers.createUser,
    createCar: CarResolvers.createCar,
  }
}
