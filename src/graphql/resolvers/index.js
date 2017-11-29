import GraphQLDate from 'graphql-date'
import MasterResolvers from './master-resolvers'
import TweetResolvers from './tweet-resolvers'
import StudioResolvers from './studio-resolvers'
import Studio from '../../models/Studio'

export default {
  Date: GraphQLDate,
  Master: {
    studio: ({ studio }) => Studio.findById(studio) 
  },
  Tweet: {
    studio: ({ studio }) => Studio.findById(studio) 
  },
  Query: {
    getMaster: MasterResolvers.getMaster,
    getMasters: MasterResolvers.getMasters,
    getStudioMasters: MasterResolvers.getStudioMasters,

    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getStudioTweets: TweetResolvers.getStudioTweets,
    me: StudioResolvers.me
  },
  Mutation: {
    createMaster: MasterResolvers.createMaster,
    updateMaster: MasterResolvers.updateMaster,
    deleteMaster: MasterResolvers.deleteMaster,

    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signup: StudioResolvers.signup,
    login: StudioResolvers.login
  }
}
