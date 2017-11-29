import GraphQLDate from 'graphql-date'
import TweetResolvers from './tweet-resolvers'
import StudioResolvers from './studio-resolvers'
import Studio from '../../models/Studio'

export default {
  Date: GraphQLDate,
  Tweet: {
    studio: ({ studio }) => Studio.findById(studio) 
  },
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getStudioTweets: TweetResolvers.getStudioTweets,
    me: StudioResolvers.me
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signup: StudioResolvers.signup,
    login: StudioResolvers.login
  }
}
