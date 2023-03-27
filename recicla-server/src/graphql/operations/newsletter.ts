import { gql } from '@apollo/client'

export default {
  Queries: {},
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