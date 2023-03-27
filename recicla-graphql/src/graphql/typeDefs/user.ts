import { gql } from "apollo-server-core";

const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    emailVerified: String
    image: String
    hashedPassword: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    searchUsers(username: String): [User]
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