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
      return Service.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getStudioServices: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Service.find({ studio: studio._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  },
  createService: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      const service = await Service.create({ ...args, studio: studio._id })

      pubsub.publish(SERVICE_ADDED, { [SERVICE_ADDED]: service })

      return service 
    } catch (error) {
      throw error
    }
  },
  updateService: async (_, { _id, ...rest }, { studio }) => {
    try {
      await requireAuth(studio) 
      const service = await Service.findOne({ _id, studio: studio._id })

      pubsub.publish(SERVICE_UPDATED, { [SERVICE_UPDATED]: service })

      if (!service) {
        throw new Error('Не найден!')
      }

      Object.entries(rest).forEach(([key, value]) => {
        service[key] = value
      })

      return service.save()
    } catch (error) {
      throw error
    }
  },
  deleteService: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)
      const service = await Service.findOne({ _id, studio: studio._id })  

      pubsub.publish(SERVICE_DELETED, { [SERVICE_DELETED]: service })

      if (!service) {
        throw new Error('Не найден!')
      }

      await service.remove()
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
