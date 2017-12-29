import Event from '../../models/Event'

export default {
  getEvent: (_, { _id }) => Event.findById(_id),
  getEvents: async (_, args) => {
    try {
      return Event.find({}).sort({ updatedAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getEventsByMaster: (master, {}) =>  Event.find({masters: master._id }), // for relationship
  createEvent: async (_, args) => {
    // Create new event
    return await Event.create(args) 
  }
}
