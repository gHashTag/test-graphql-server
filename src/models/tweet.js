import mongoose from 'mongoose'
import { UserTC } from './user'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'

const TweetSchema = new mongoose.Schema({
  text: String,
  userID: String
}, { timestamps: true })

TweetSchema.index({ userID: 1 }, { background: true })

export const Tweet = mongoose.model('Tweet', TweetSchema)
export const TweetTC = composeWithRelay(composeWithMongoose(Tweet))

TweetTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findOne'),
  prepareArgs: {
    filter: source => ({ user: source._id }),
    skip: null,
    sort: null,
  },
  projection: { _id: true },
})
