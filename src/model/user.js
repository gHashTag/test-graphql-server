import mongoose from 'mongoose'
import { TweetTC } from './tweet'
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
  email: String,
  tweetsIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  }],
}, { timestamps: true })


export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithMongoose(User)

UserTC.addRelation(
  'tweets',
  {
    resolver: () => TweetTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: (source) => source.tweetsIds || [],
    },
    projection: { tweetsIds: true },
  }
)
