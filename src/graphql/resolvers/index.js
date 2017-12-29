import MasterResolvers from './master-resolvers'
import EventResolvers from './event-resolvers'

export default {
  Master:{
    eventslink: EventResolvers.getEventsByMaster  // tricky part to link query relation ship between Master and Event
  },
  Event:{
    masterlink: MasterResolvers.getMasterByEvent  // tricky part to link query relation ship between Master and Event
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
