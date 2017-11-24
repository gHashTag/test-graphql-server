import mongoose from 'mongoose'
import { StudioTC } from './studio'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'


const MasterSchema = new mongoose.Schema({
  name: String,
  profession: String,
  img: String,
  imgSmall: String,
  info: String,
  studioID: {
    type: String,
    index: true,
  },
}, { timestamps: true })


export const Master = mongoose.model('Master', MasterSchema)
export const MasterTC = composeWithMongoose(Master)

MasterTC.addRelation('studio', {
  resolver: () => StudioTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.studioID,
    skip: null,
    sort: null,
  },
  projection: { _id: true }
})
