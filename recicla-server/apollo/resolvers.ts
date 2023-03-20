import UserModel from "../model/UserModel"
import { UserMutations } from "../mutations/UserMutations"

export const resolvers = {
  Query: {
    viewer() {
      return { id: 1, name: 'John Smith', status: 'cached' }
    },
    async users(after?: String, first?: Number, before?: String, last?: Number, search?: String) {
      const obj = { count: await UserModel.count() }
      console.warn('===count', obj)
      return obj
    }
  },
  Mutation: {
    ...UserMutations
  }
}