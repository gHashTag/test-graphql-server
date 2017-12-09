import Price from '../../models/Price'
import { requireAuth } from '../../services/auth'
import { pubsub } from '../../config/pubsub'

const PRICE_ADDED = 'priceAdded'
const PRICE_UPDATED = 'priceUpdated'
const PRICE_DELETED = 'priceDeleted'

export default {
  getPrice: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)  
      return Price.findById(_id)
    } catch (error) {
      throw error
    }
  },
  getPrices: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Price.find({}).sort({ updatedAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getStudioPrices: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Price.find({ studio: studio._id }).sort({ updatedAt: -1 })
    } catch (error) {
      throw error
    }
  },
  createPrice: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      const item = await Price.create({ ...args, studio: studio._id })

      pubsub.publish(PRICE_ADDED, { [PRICE_ADDED]: item })
      console.log('pubsub', pubsub.publish)

      return item
    } catch (error) {
      throw error
    }
  },
  updatePrice: async (_, { _id, ...rest }, { studio }) => {
    try {
      await requireAuth(studio) 
      const item = await Price.findOne({ _id, studio: studio._id })

      pubsub.publish(PRICE_UPDATED, { [PRICE_UPDATED]: item })

      if (!item) {
        throw new Error('Не найден!')
      }

      Object.entries(rest).forEach(([key, value]) => {
        item[key] = value
      })

      return item.save()
    } catch (error) {
      throw error
    }
  },
  deletePrice: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)
      const item = await Price.findOne({ _id, studio: studio._id })  

      pubsub.publish(PRICE_DELETED, { [PRICE_DELETED]: item })

      if (!item) {
        throw new Error('Не найден!')
      }

      await item.remove()
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error
    } 
  },
  priceAdded: {
    subscribe: () => pubsub.asyncIterator(PRICE_ADDED)
  },
  priceUpdated: {
    subscribe: () => pubsub.asyncIterator(PRICE_UPDATED)
  },
  priceDeleted: {
    subscribe: () => pubsub.asyncIterator(PRICE_DELETED)
  }
}
