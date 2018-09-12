import mongoose from 'mongoose'
import { UserTC } from './user'
import { MasterTC } from './master'
import { CostTC } from './cost'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'


const StudioSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  address: String,
  city: String,
  phone: String,
  contactName: String
}, { timestamps: true })


//StudioSchema.index({ name: 1 }, { background: true })

export const Studio = mongoose.model('Studio', StudioSchema)
export const StudioTC = composeWithMongoose(Studio)

StudioTC.addRelation('users', {
  resolver: () => UserTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ studioID: source._id }),
  },
  projection: { _id: true },
})

StudioTC.addRelation('masters', {
  resolver: () => MasterTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ studioID: source._id }),
  },
  projection: { _id: true },
})

StudioTC.addRelation('cost', {
  resolver: () => CostTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ studioID: source._id }),
  },
  projection: { _id: true },
})
