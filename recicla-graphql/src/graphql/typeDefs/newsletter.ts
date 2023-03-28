import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Mutation {
    createNewsletterEntry(email: String!): CreateNewsletterResponse
  }

  type CreateNewsletterResponse {
    success: Boolean
    error: String
  }

  type Edge {
    cursor: String
    node: Newsletter
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }
  type Response {
    edges: [Edge]
    pageInfo: PageInfo
    count: Int
  }

  type Query {
    newsletters(first: Int, after: String, search: String): Response
    newslettersCount: Count
  }

  type Count {
    count: Int
  }

  type Newsletter {
    id:    String
    email: String
  }

  schema {
    query: Query
  }
`

export default typeDefs