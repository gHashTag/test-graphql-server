import MasterResolvers from './master-resolvers'
import EventResolvers from './event-resolvers'

export default {
  Master:{
    events: EventResolvers.getEventsByMaster  // tricky part to link query relation ship between Master and Event
  },
  Event:{
    masters: MasterResolvers.getMasterByEvent  // tricky part to link query relation ship between Master and Event
  },
  Query: {
    getMaster: MasterResolvers.getMaster,
    getMasters: MasterResolvers.getMasters,
    getEvent: EventResolvers.getEvent,
    getEvents: EventResolvers.getEvents
  },
  Mutation: {
    createMaster: MasterResolvers.createMaster,
    createEvent: EventResolvers.createEvent
  }
}
