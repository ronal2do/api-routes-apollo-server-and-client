import { gql } from '@apollo/client'

export default {
  Queries: {
    questions: gql`
      query Questions {
        questions {
          edges {
            cursor
            node {
              id
              introduction
              label
              correctAnswer
              level
              answers
              metadata {
                id
                questionId
                hits
                misses
                views
              }
              createdAt
              updatedAt
            }
          }
          count
        }
      }
    `
  },
  Mutations: {
    registerQuestion: gql`
     mutation RegisterQuestion($introduction: String!, $label: String!, $level: QuestionLevels!, $correctAnswer: Int, $answers: [String]) {
        registerQuestion(introduction: $introduction, label: $label, level: $level, correctAnswer: $correctAnswer, answers: $answers) {
          question {
            id
          }
          success
          error
        }
      }
    ` 
  }
}