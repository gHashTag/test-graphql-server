import mongoose from 'mongoose'
import composeWithMongoose from 'graphql-compose-mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String
}, { timestamps: true })

export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithMongoose(User)
