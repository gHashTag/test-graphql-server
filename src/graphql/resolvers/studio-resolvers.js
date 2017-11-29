import Studio from '../../models/Studio'
import { requireAuth } from '../../services/auth'

export default {
  signup: async (_, { ...rest }) => {
    try {
      const studio = await Studio.create({ ...rest })

      return {
        token: studio.createToken()
      }
    } catch (error) {
      throw error
    }
  },
  login: async (_, { email, password }) => {
    try {
      const studio = await Studio.findOne({ email })

      if (!studio) {
        throw new Error('Такой студиии у нас еще нет')
      }
      if (!studio.authenticateStudio(password)) {
        throw new Error('Пароль не совпадает')
      }

      return {
        token: studio.createToken() 
      }
    } catch (error) {
      throw error
    }
  },

  me: async (_, args, { studio }) => {
    try {
      const me = await requireAuth(studio)
      return me
    } catch (error) {
      throw error
    }
  }
}
