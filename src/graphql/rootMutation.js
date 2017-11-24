import { GQC } from 'graphql-compose'
import { StudioTC } from '../models/studio'
import { UserTC } from '../models/user'
import { MasterTC } from '../models/master'
import { CostTC } from '../models/cost'

GQC.rootMutation().addFields({
  // Studio 
  studioCreate: StudioTC.getResolver('createOne'),
  studioUpdateById: StudioTC.getResolver('updateById'),
  studioUpdateOne: StudioTC.getResolver('updateOne'),
  studioUpdateMany: StudioTC.getResolver('updateMany'),
  studioRemoveById: StudioTC.getResolver('removeById'),
  studioRemoveOne: StudioTC.getResolver('removeOne'),
  studioRemoveMany: StudioTC.getResolver('removeMany'),
  // User
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
  // Master 
  masterCreate: MasterTC.getResolver('createOne'),
  masterUpdateById: MasterTC.getResolver('updateById'),
  masterrUpdateOne: MasterTC.getResolver('updateOne'),
  masterUpdateMany: MasterTC.getResolver('updateMany'),
  masterRemoveById: MasterTC.getResolver('removeById'),
  masterRemoveOne: MasterTC.getResolver('removeOne'),
  masterRemoveMany: MasterTC.getResolver('removeMany'),
  // Cost 
  costCreate: CostTC.getResolver('createOne'),
  costUpdateById: CostTC.getResolver('updateById'),
  costUpdateOne: CostTC.getResolver('updateOne'),
  costUpdateMany: CostTC.getResolver('updateMany'),
  costRemoveById: CostTC.getResolver('removeById'),
  costRemoveOne: CostTC.getResolver('removeOne'),
  costRemoveMany: CostTC.getResolver('removeMany'),
})

