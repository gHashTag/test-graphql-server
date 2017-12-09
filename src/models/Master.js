import mongoose, { Schema } from 'mongoose'

const MasterSchema = new Schema({
  title: String,
  subtitle: String,
  img: String,
  info: String,
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio'
  }
}, { timestamps: true })

export default mongoose.model('Master', MasterSchema)
