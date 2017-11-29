import Master from '../../models/Master'
import { requireAuth } from '../../services/auth'

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
      return Master.create({ ...args, studio: studio._id })
    } catch (error) {
      throw error
    }
  },
  updateMaster: async (_, { _id, ...rest }, { studio }) => {
    try {
      await requireAuth(studio) 
      const master = await Master.findOne({ _id, studio: studio._id })

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
  }
}
