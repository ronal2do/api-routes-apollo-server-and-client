import { gql } from '@apollo/client'

export default {
  Queries: {
    user: gql`
      query User($id: String!) {
        user(id: $id) {
          id
          name
          email
          emailVerified
          image
          hashedPassword
          username
          createdAt
          updatedAt
        }
      }
    `,
    searchUsers: gql`
      query SearchUsers($name: String!) {
        searchUsers(name: $name) {
          id
          name
        }
      }
    `
  },
  Mutations: {
    registerUserWithEmail: gql`
      mutation RegisterUserWithEmail($name: String!, $email: String!, $password: String!) {
        registerUserWithEmail(name: $name, email: $email, password: $password) {
          user {
            name
          }
          success
          error
        }
      }
    ` 
  }
}