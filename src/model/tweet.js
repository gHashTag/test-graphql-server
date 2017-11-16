import mongoose from 'mongoose'
import { UserTC } from './user'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'

const TweetSchema = new mongoose.Schema({
  text: String,
}, { timestamps: true })

TweetSchema.index({ userId: 1 }, { background: true })

export const Tweet = mongoose.model('Tweet', TweetSchema)
export const TweetTC = composeWithRelay(composeWithMongoose(Tweet))
