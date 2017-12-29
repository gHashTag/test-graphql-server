import mongoose, { Schema } from 'mongoose'

const EventSchema = new Schema({
  title: String,
  masters: {
    type: Schema.Types.ObjectId,
    ref: 'master'
  }
}, { timestamps: true })

export default mongoose.model('event', EventSchema) 
