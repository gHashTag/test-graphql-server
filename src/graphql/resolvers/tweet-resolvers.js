import Tweet from '../../models/Tweet'
import { requireAuth } from '../../services/auth'

export default {
  getTweet: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)  
      return Tweet.findById(_id)
    } catch (error) {
      throw error
    }
  },
  getTweets: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Tweet.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getStudioTweets: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Tweet.find({ studio: studio._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  },
  createTweet: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Tweet.create({ ...args, studio: studio._id })
    } catch (error) {
      throw error
    }
  },
  updateTweet: async (_, { _id, ...rest }, { studio }) => {
    try {
      await requireAuth(studio) 
      const tweet = await Tweet.findOne({ _id, studio: studio._id })

      if (!tweet) {
        throw new Error('Не найден!')
      }

      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value
      })

      return tweet.save()
    } catch (error) {
      throw error
    }
  },
  deleteTweet: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)
      const tweet = await Tweet.findOne({ _id, studio: studio._id })  

      if (!tweet) {
        throw new Error('Не найден!')
      }

      await tweet.remove()
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error
    } 
  }
}
