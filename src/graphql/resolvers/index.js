import GraphQLDate from 'graphql-date'
import MasterResolvers from './master-resolvers'
import ServiceResolvers from './service-resolvers'
import TweetResolvers from './tweet-resolvers'
import StudioResolvers from './studio-resolvers'
import Studio from '../../models/Studio'

export default {
  Date: GraphQLDate,
  Master: {
    studio: ({ studio }) => Studio.findById(studio) 
  },
  Service: {
    studio: ({ studio }) => Studio.findById(studio) 
  },
  Tweet: {
    studio: ({ studio }) => Studio.findById(studio) 
  },
  Query: {
    getMaster: MasterResolvers.getMaster,
    getMasters: MasterResolvers.getMasters,
    getStudioMasters: MasterResolvers.getStudioMasters,

    getService: ServiceResolvers.getService,
    getServices: ServiceResolvers.getServices,
    getStudioServices: ServiceResolvers.getStudioServices,

    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getStudioTweets: TweetResolvers.getStudioTweets,

    me: StudioResolvers.me
  },
  Mutation: {
    createMaster: MasterResolvers.createMaster,
    updateMaster: MasterResolvers.updateMaster,
    deleteMaster: MasterResolvers.deleteMaster,

    createService: ServiceResolvers.createService,
    updateService: ServiceResolvers.updateService,
    deleteService: ServiceResolvers.deleteService,

    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,

    signup: StudioResolvers.signup,
    login: StudioResolvers.login
  },
  Subscription: {
    masterAdded: MasterResolvers.masterAdded,
    masterUpdated: MasterResolvers.masterUpdated,
    masterDeleted: MasterResolvers.masterDeleted,

    serviceAdded: ServiceResolvers.serviceAdded,
    serviceUpdated: ServiceResolvers.serviceUpdated,
    serviceDeleted: ServiceResolvers.serviceDeleted
  }
}
