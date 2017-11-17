import mongoose from 'mongoose'
import { UserTC } from './user'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'

const TweetSchema = new mongoose.Schema({
  // _id this field created automatically


  // remove this for simplicity
  // tweetID: {
  //   type: Number,
  //   description: 'Tweet unique ID',
  //   unique: true,  <====== this requires that all records should have unique values
  // },

  text: String,
  userID: {
    type: String,
    index: true,
  },
}, { timestamps: true })

// simle index created via model `index: true` option
// following index just allow to create complex indexes
// TweetSchema.index({ userID: 1 }, { background: true })

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
