import mongoose from 'mongoose'
import { UserTC } from './user'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'

const TweetSchema = new mongoose.Schema({
  tweetID: {
    type: Number,
    description: 'Tweet unique ID',
    unique: true,
  },
  text: String,
}, { timestamps: true })

TweetSchema.index({ userId: 1 }, { background: true })

export const Tweet = mongoose.model('Tweet', TweetSchema)
export const TweetTC = composeWithRelay(composeWithMongoose(Tweet))

TweetTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findOne'),
  prepareArgs: {
    filter: source => ({ userID: source.userID }),
    skip: null,
    sort: null,
  },
  projection: { userID: true },
})
