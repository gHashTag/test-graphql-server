import Master from '../../models/Master'
import { requireAuth } from '../../services/auth'
import { pubsub } from '../../config/pubsub'

const MASTER_ADDED = 'masterAdded'
const MASTER_UPDATED = 'masterUpdated'
const MASTER_DELETED = 'masterDeleted'

export default {
  getMaster: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)  
      return Master.findById(_id)
    } catch (error) {
      throw error
    }
  },
  getMasters: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Master.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getStudioMasters: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      return Master.find({ studio: studio._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  },
  createMaster: async (_, args, { studio }) => {
    try {
      await requireAuth(studio)
      const master = await Master.create({ ...args, studio: studio._id })

      pubsub.publish(MASTER_ADDED, { [MASTER_ADDED]: master })

      return master
    } catch (error) {
      throw error
    }
  },
  updateMaster: async (_, { _id, ...rest }, { studio }) => {
    try {
      await requireAuth(studio) 
      const master = await Master.findOne({ _id, studio: studio._id })

      pubsub.publish(MASTER_UPDATED, { [MASTER_UPDATED]: master })

      if (!master) {
        throw new Error('Не найден!')
      }

      Object.entries(rest).forEach(([key, value]) => {
        master[key] = value
      })

      return master.save()
    } catch (error) {
      throw error
    }
  },
  deleteMaster: async (_, { _id }, { studio }) => {
    try {
      await requireAuth(studio)
      const master = await Master.findOne({ _id, studio: studio._id })  

      pubsub.publish(MASTER_DELETED, { [MASTER_DELETED]: master })

      if (!master) {
        throw new Error('Не найден!')
      }

      await master.remove()
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error
    } 
  },
  masterAdded: {
    subscribe: () => pubsub.asyncIterator(MASTER_ADDED)
  },
  masterUpdated: {
    subscribe: () => pubsub.asyncIterator(MASTER_UPDATED)
  },
  masterDeleted: {
    subscribe: () => pubsub.asyncIterator(MASTER_DELETED)
  }
}
