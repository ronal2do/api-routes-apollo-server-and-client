import gql from 'graphql-tag';

export const PROFILE_QUERY = gql`
  query ME{
    me{
      id
      _id
      email
      name
      picture
      cpf
      points {
        points
      }
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

export const NEXT_QUESTION = gql`
  query NEXT_QUESTION($cursor: String) {
    questions(first: 1, after: $cursor) {
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