import userResolvers from './user'
import newsletterResolvers from './newsletter'
import questionResolvers from './question'
import merge from "lodash.merge"

const resolvers = merge({}, 
  userResolvers,
  newsletterResolvers,
  questionResolvers
)

export default resolvers