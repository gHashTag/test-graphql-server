import mongoose from 'mongoose'
import { UserTC } from './user'
import composeWithMongoose from 'graphql-compose-mongoose'

const TweetSchema = new mongoose.Schema({
  text: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  }
}, { timestamps: true } )

export const Tweet = mongoose.model('Tweet', TweetSchema)
export const TweetTC = composeWithMongoose(Tweet)
