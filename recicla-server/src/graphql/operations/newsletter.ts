import { gql } from '@apollo/client'

export default {
  Queries: {
    newslettersCount: gql`
      query NewsletterCount {
        newsletters {
          count
        }
      }
    `,
    newsletters: gql`
      query newsletters {
        newsletters {
          count
          edges {
            cursor
            node {
              id
              email
              createdAt
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  Mutations: {
    createNewsletterEntry: gql`
      mutation CreateNewsletterEntry($email: String!) {
        createNewsletterEntry(email: $email) {
          success
          error
        }
      }
    ` 
  }
}