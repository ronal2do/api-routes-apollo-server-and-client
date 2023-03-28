import gql from "graphql-tag"

const typeDefs = gql`
  scalar Date

  type User {
    id: String
    name: String
    email: String
    emailVerified: String
    image: String
    hashedPassword: String
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type SearchedUser {
    id: String
    name: String
  }

  type Query {
    user(id: String!): User 
    searchUsers(name: String): [User]
    me: User
  }

  type Mutation {
    registerUserWithEmail(name: String!, email: String!, password: String!): RegisterUserWithEmailResponse
  }

  type RegisterUserWithEmailResponse {
    user: User
    success: Boolean
    error: String
  }
`

export default typeDefs