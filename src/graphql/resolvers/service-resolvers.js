import Service from '../../models/Service'
import { requireAuth } from '../../services/auth'
import { pubsub } from '../../config/pubsub'

const SERVICE_ADDED = 'serviceAdded'
const SERVICE_UPDATED = 'serviceUpdated'
const SERVICE_DELETED = 'serviceDeleted'

export default {
  getService: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)  
      return Service.findById(_id)
    } catch (error) {
      throw error
    }
  },
  getServices: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Service.find({}).sort({ updatedAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getStudioServices: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Service.find({ studio: studio._id }).sort({ updatedAt: -1 })
    } catch (error) {
      throw error
    }
  },
  createService: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      const item = await Service.create({ ...args, studio: studio._id })

      pubsub.publish(SERVICE_ADDED, { [SERVICE_ADDED]: item })
      console.log('pubsub', pubsub.publish)

      return item
    } catch (error) {
      throw error
    }
  },
  updateService: async (_, { _id, ...rest }, { studio }) => {
    try {
      await requireAuth(studio) 
      const item = await Service.findOne({ _id, studio: studio._id })

      pubsub.publish(SERVICE_UPDATED, { [SERVICE_UPDATED]: item })

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
  deleteService: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)
      const item = await Service.findOne({ _id, studio: studio._id })  

      pubsub.publish(SERVICE_DELETED, { [SERVICE_DELETED]: item })

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
  serviceAdded: {
    subscribe: () => pubsub.asyncIterator(SERVICE_ADDED)
  },
  serviceUpdated: {
    subscribe: () => pubsub.asyncIterator(SERVICE_UPDATED)
  },
  serviceDeleted: {
    subscribe: () => pubsub.asyncIterator(SERVICE_DELETED)
  }
}
