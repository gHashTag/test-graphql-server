import Master from '../../models/Master'

export default { 
  getMaster: (_, { _id }) => Master.findById(_id),
  getMasters: () => Master.find({}),
  getMasterByEvent: (event, args) => Master.findById(event.masters), // for relationship
  createMaster: (_, args) => {
    return Master.create(args) 
  }
}
