import mongoose from 'mongoose'
import { TweetTC } from './tweet'
import composeWithMongoose from 'graphql-compose-mongoose'
import composeWithRelay from 'graphql-compose-relay'


const UserSchema = new mongoose.Schema({
  // remove this for simplicity, cause `_id` will be crated automatically
  // userID: {
  //   type: Number,
  //   description: 'User unique ID',
  //   unique: true,
  // },
  username: {
    type: String,
    // unique: true , remove this for simplicity
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String,
}, { timestamps: true })


export const User = mongoose.model('User', UserSchema)
export const UserTC = composeWithRelay(composeWithMongoose(User))

UserTC.addRelation(
	  'tweets',
	  {
	    resolver: () => TweetTC.getResolver('findMany'),
	    prepareArgs: {
        filter: source => ({ userID: source._id }),
	    },
	    projection: { _id: true },
	  }
)
