import mongoose, { Schema } from 'mongoose'

const TweetSchema = new Schema({
  text: String,
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Tweet', TweetSchema)
