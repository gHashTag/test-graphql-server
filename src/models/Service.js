import mongoose, { Schema } from 'mongoose'

const ServiceSchema = new Schema({
  name: String,
  servicename: String,
  img: String,
  info: String,
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio'
  }
}, { timestamps: true })

export default mongoose.model('Service', ServiceSchema)