import { GQC } from 'graphql-compose'
import { StudioTC } from '../models/studio'
import { UserTC } from '../models/user'
import { MasterTC } from '../models/master'
import { CostTC } from '../models/cost'

GQC.rootQuery().addFields({
  // Studio 
  studioById: StudioTC.getResolver('findById'),
  studioByIds: StudioTC.getResolver('findByIds'),
  studioOne: StudioTC.getResolver('findOne'),
  studioMany: StudioTC.getResolver('findMany'),
  studioCount: StudioTC.getResolver('count'),
  studioConnection: StudioTC.getResolver('connection'),
  studioPagination: StudioTC.getResolver('pagination'),
  // User
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
  // Master 
  masterById: MasterTC.getResolver('findById'),
  masterByIds: MasterTC.getResolver('findByIds'),
  masterOne: MasterTC.getResolver('findOne'),
  masterMany: MasterTC.getResolver('findMany'),
  masterCount: MasterTC.getResolver('count'),
  masterConnection: MasterTC.getResolver('connection'),
  masterPagination: MasterTC.getResolver('pagination'),
  // Cost 
  costById: CostTC.getResolver('findById'),
  costByIds: CostTC.getResolver('findByIds'),
  costOne: CostTC.getResolver('findOne'),
  costMany: CostTC.getResolver('findMany'),
  costCount: CostTC.getResolver('count'),
  costConnection: CostTC.getResolver('connection'),
  costPagination: CostTC.getResolver('pagination'),
})
