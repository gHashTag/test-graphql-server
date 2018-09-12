import { GQC } from 'graphql-compose'

import './rootQuery'
import './rootMutation'


const graphqlSchema = GQC.buildSchema()
export default graphqlSchema
