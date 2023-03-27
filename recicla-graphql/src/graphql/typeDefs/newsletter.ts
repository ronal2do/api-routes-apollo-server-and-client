import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Mutation {
    createNewsletterEntry(email: String!): CreateNewsletterResponse
  }

  type CreateNewsletterResponse {
    success: Boolean
    error: String
  }
`

export default typeDefs