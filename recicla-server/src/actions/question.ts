import QuestionOperations from "../graphql/operations/question";
import { useServerQuery } from "./apollo";

export async function getQuestionsList() {
  const { data, loading, error } = await useServerQuery(
    QuestionOperations.Queries.questions
  );

  return {
    data, 
    loading, 
    error
  }
}