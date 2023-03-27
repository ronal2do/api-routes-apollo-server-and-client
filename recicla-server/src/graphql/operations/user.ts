import { gql } from '@apollo/client'

export default {
  Queries: {},
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