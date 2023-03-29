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
    cpf: Int
    userPushToken: UserPushToken
    accounts: [Account]
    coupons: [Coupons]
    # sessions
    answers: [Answer]
    points: Int
  }

  type Answer {
    userId: String
    questionId: String
    result: Boolean
    createdAt: Date
  }

  type Coupons {
    id: String
    createdAt: Date
  }

  type Account {
    provider: String
  }

  type UserPushToken {
    id: String
    pushUserId: String
    token: String
    deleted: Boolean
    active: Boolean
    createdAt: Date
    updatedAt: Date
    type: UserEndpointType
  }

  enum UserEndpointType {
    IOS
    ANDROID
    WEB
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
    loginUserWithEmail(email: String!, password: String!): RegisterUserWithEmailResponse
    addPointsToUser(id: String!, action: Rules): PointsResponse
  }

  enum Rules {
    SOFT
    MEDIUM
    HARD
    EXPERT
    GOLD
  }

  type PointsResponse {
    success: Boolean
    error: String
  }

  type RegisterUserWithEmailResponse {
    user: User
    success: Boolean
    error: String
    token: String
  }
`

export default typeDefs