import gql from 'graphql-tag';

export const PROFILE_QUERY = gql`
  query ME{
    me{
      id
      name
      email
      emailVerified
      image
      hashedPassword
      username
      createdAt
      updatedAt
      cpf
      userPushToken {
        id
        pushUserId
        token
        deleted
        active
        createdAt
        updatedAt
        type
      }
      accounts {
        provider
      }
      coupons {
        id
        createdAt
      }
      answers {
        userId
        questionId
        result
        createdAt
      }
      points
    }
  }
`

export const NEXT_QUESTION = gql`
  query NEXT_QUESTION($first: Int) {
    questions(first: $first) {
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
    pageInfo {
      endCursor
      hasNextPage
    }
    count
  }
  }
`

export const NEXT_QUESTION_2 = gql`
  query NEXT_QUESTION_2($sequence: Int) {
    nextQuestion(sequence: $sequence) {
      pageInfo {
        endCursor
        hasNextPage
      }
      count
      edges {
        node {
          id
          _id
          introduction
          label
          level
          correctAnswer
          answers
        }
      }
    }
  }
`

export const MY_CUPOMS = gql`
  query MY_CUPOMS{
    me{
      _id
      cpf
      cupoms {
        count
        edges {
          node {
            _id
            id
            actived
            number
          }
        }
      }
    }
  }
`
export const QUESTION_COUNT = gql`
  query QUESTION_COUNT {
    questions {
      count
    }
  }
`