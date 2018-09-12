import mongoose from 'mongoose'
import { StudioTC } from './studio'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  firstName: String,
  lastName: String,
  password: String,
  email: {
    type: String,
    unique: true
  },
  studioID: {
    type: String,
    index: true,
  },
}, { timestamps: true })


export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithMongoose(User)


UserTC.addRelation('studio', {
  resolver: () => StudioTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.studioID,
    skip: null,
    sort: null,
  },
  projection: { _id: true }
})
