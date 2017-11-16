import { GQC } from 'graphql-compose'
import { UserTC } from '../models/user'
import { TweetTC } from '../models/tweet'

GQC.rootQuery().addFields({
  tweetById: TweetTC.getResolver('findById'),
  tweetByIds: TweetTC.getResolver('findByIds'),
  tweetOne: TweetTC.getResolver('findOne'),
  tweetMany: TweetTC.getResolver('findMany'),
  tweetCount: TweetTC.getResolver('count'),
  tweetConnection: TweetTC.getResolver('connection'),
  tweetPagination: TweetTC.getResolver('pagination'),
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
})
