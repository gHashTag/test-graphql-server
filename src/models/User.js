import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'car'
  }]
}, { timestamps: true })

export default mongoose.model('user', userSchema) 
