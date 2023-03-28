import { useLazyQuery } from "@apollo/client";
import { User } from "@prisma/client";

import UserOperations from "../../graphql/operations/user";

export interface SearchUserInput {
  name: string;
}

export interface SearchUserData {
  searchUsers: Partial<User>[]
}

export const useSearchUser = () => {
  const [ searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUserData, 
    SearchUserInput
  >(UserOperations.Queries.searchUsers)

  return {
    searchUsers, 
    data,
    loading,
    error
  };
}
