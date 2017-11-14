import mongoose from 'mongoose'
import composeWithMongoose from 'graphql-compose-mongoose'

const TweetSchema = new mongoose.Schema({
  text: String
}, { timestamps: true } )

export const Tweet = mongoose.model('Tweet', TweetSchema)
export const TweetTC = composeWithMongoose(Tweet)
