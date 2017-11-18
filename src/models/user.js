import mongoose from 'mongoose'
import { TweetTC } from './tweet'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  password: String,
  email: {
    type: String,
    unique: true
  },
}, { timestamps: true })


export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithRelay(composeWithMongoose(User))

UserTC.addRelation(
	  'tweets',
	  {
	    resolver: () => TweetTC.getResolver('findMany'),
	    prepareArgs: {
      //filter: source => ({ userIDs: source._id }),
      filter: source => { 
        console.log('source', source)
        return {tweets: source._id} 
      }
	    },
	    projection: { _id: true },
	  }
)
