import gql from "graphql-tag"

const typeDefs = gql`
  scalar Date

  type QuestionAnswer {
    id: String  
    text: String
    option: Int
    questionId: String
    createdAt: Date
    updatedAt: Date
  }

  enum QuestionLevels {
    SOFT
    HARD
    MEDIUM
    EXPERT
  }

  type Question {
    id: String          
    introduction: String
    label: String
    correctAnswer: Int
    level: QuestionLevels
    answers: [String]
    metadata: QuestionMetadata
    createdAt: Date
    updatedAt: Date
    sequentialIndex: Int
  }

  type QuestionMetadata {
    id: String 
    questionId: String
    hits: Int
    misses: Int
    views: Int
  }

  type QuestionEgde {
    cursor: String
    node: Question
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }
  type QuestionResponse {
    edges: [QuestionEgde]
    pageInfo: PageInfo
    count: Int
  }

  type Query {
    questions(first: Int, after: String, search: String): QuestionResponse
    randomQuestions: Question
  }

  type Mutation {
    registerQuestion(introduction: String!, label: String!, level: QuestionLevels!, correctAnswer: Int, answers: [String]): RegisteredQuestionPayload
    answerQuestion(userId: String!, questionId: String!, result: Boolean!): MetaQuestionPayload
  }

  type RegisteredQuestionPayload {
    question: Question
    success: Boolean
    error: String
  }

  type MetaQuestionPayload {
    success: Boolean
    error: String
  }
`

export default typeDefs