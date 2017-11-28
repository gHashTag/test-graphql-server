import { GQC } from 'graphql-compose'

import './rootQuery'
import './rootMutation'
import './rootSubscription'

const graphqlSchema = GQC.buildSchema()
export default graphqlSchema
