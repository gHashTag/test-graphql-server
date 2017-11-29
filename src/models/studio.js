import mongoose, { Schema } from 'mongoose'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import constants from '../config/constants'

const StudioSchema = new Schema({
  studioname: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  avatar: String,
  address: String,
  city: String,
  phone: String,
  contactName: String
}, { timestamps: true })

StudioSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password)
    return next()
  }

  return next()
})

StudioSchema.methods = {
  _hashPassword(password) {
    return hashSync(password) 
  },
  authenticateStudio(password) {
    return compareSync(password, this.password)
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    )
  }
} 

export default mongoose.model('Studio', StudioSchema)
