import { ApolloError, useQuery } from "@apollo/client";
import { Question } from "@prisma/client";
import QuestionOperations from "@/graphql/operations/question";

interface IQuestionInput {}

interface IQuestion extends Question {
  metadata: {
    hits: number
    misses: number
    views: number
  }
}


interface Edge {
  cursor: string;
  node: IQuestion;
}

export interface IQuestions {
  count: number;
  edges: [Edge]
  pageInfo: {
    endCursor: string;
    hasNextPage: string;
  }
}

interface IQuestionData {
  questions: IQuestions
}

interface IuseGetQuestionsPayload {
  data: IQuestionData | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useGetQuestions = (): IuseGetQuestionsPayload => {
  const { data, loading, error } = useQuery<
    IQuestionData, 
    IQuestionInput
  >(QuestionOperations.Queries.questions);

  return {
    data,
    loading,
    error
  };
}
