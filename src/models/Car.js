import mongoose, { Schema } from 'mongoose'

const carSchema = new Schema({
  make: String,
  model: String,
  year: String,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true })

export default mongoose.model('car', carSchema) 
