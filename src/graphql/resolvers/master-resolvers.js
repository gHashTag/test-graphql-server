import Master from '../../models/Master'

export default { 
  getMaster: (_, { _id }) => Master.findById(_id),
  getMasters: async (_, args) => {
    try {
      return Master.find({}).sort({ updatedAt: -1 })
    } catch (error) {
      throw error
    }
  },
  getMasterByEvent: (event, args) => Master.findById(event.masters), // for relationship
  createMaster: (_, args) => {
    return Master.create(args) 
  }
}
