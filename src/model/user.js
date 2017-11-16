import mongoose from 'mongoose'
import { TweetTC } from './tweet'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String,
}, { timestamps: true })


export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithRelay(composeWithMongoose(User))

UserTC.addRelation('tweetConnection', {
  resolver: () => TweetTC.getResolver('connection'),
  prepareArgs: {
    filter: source => ({ userId: source._id.toString() })
  },
  projection: { userID: true },
})
