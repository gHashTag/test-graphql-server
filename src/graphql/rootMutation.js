import { GQC } from 'graphql-compose'
import { TweetTC } from '../models/tweet'
import { UserTC } from '../models/user'

GQC.rootMutation().addFields({
  // User
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
  // Teet
  tweetCreate: TweetTC.getResolver('createOne'),
  tweetUpdateById: TweetTC.getResolver('updateById'),
  tweetUpdateOne: TweetTC.getResolver('updateOne'),
  tweetUpdateMany: TweetTC.getResolver('updateMany'),
  tweetRemoveById: TweetTC.getResolver('removeById'),
  tweetRemoveOne: TweetTC.getResolver('removeOne'),
  tweetRemoveMany: TweetTC.getResolver('removeMany'),
})

