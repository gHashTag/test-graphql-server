import mongoose from 'mongoose'
import { StudioTC } from './studio'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'

const CostSchema = new mongoose.Schema({
  tab: { 
    type: String,
    enum: [ 'Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6' ]
  },
  name: String,
  limit: String,
  amount: String,
  price: String,
  img: String,
  imgSmall: String,
  info: String,
  studioID: {
    type: String,
    index: true,
  },
}, { timestamps: true })


export const Cost = mongoose.model('Cost', CostSchema)
export const CostTC = composeWithMongoose(Cost)

CostTC.addRelation('studio', {
  resolver: () => StudioTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.studioID,
    skip: null,
    sort: null,
  },
  projection: { _id: true }
})
