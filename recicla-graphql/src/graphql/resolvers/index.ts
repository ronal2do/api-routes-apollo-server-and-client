import userResolvers from './user'
import newsletterResolvers from './newsletter'
import merge from "lodash.merge"

const resolvers = merge({}, 
  userResolvers,
  newsletterResolvers
)

export default resolvers