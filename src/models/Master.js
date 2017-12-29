import mongoose, { Schema } from 'mongoose'

const MasterSchema = new Schema({
  title: String,
  eventslink: [{
    type: Schema.Types.ObjectId,
    ref: 'event'
  }]
}, { timestamps: true })

export default mongoose.model('master', MasterSchema) 
