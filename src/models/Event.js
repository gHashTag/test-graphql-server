import mongoose, { Schema } from 'mongoose'

const EventSchema = new Schema({
  title: String,
  event_times: Array,
  masterlink: {
    type: Schema.Types.ObjectId,
    ref: 'master'
  }
}, { timestamps: true })

export default mongoose.model('event', EventSchema) 
