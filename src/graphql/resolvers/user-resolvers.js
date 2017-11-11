import User from '../../models/User'

export default { 
  getUser: (_, { _id }) => User.findById(_id),
  getUsers: () => User.find({}),
  createUser: (_, args) => {
    return User.create(args) 
  }
}
