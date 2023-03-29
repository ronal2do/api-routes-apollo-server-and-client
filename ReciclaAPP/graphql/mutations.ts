import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
  mutation RegisterUserWithEmail($name: String!, $email: String!, $password: String!) {
    registerUserWithEmail(name: $name, email: $email, password: $password) {
      user {
        name
        id
      }
      token
      success
      error
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation LoginUserWithEmail($email: String!, $password: String!) {
    loginUserWithEmail(email: $email, password: $password) {
      user {
        id
      }
      success
      error
      token
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($password: String!, $token: String!) {
    UserResetPassword(input: { password: $password, token: $token }) {
      error
      token
    }
  } 
`

export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD($password: String!, $oldPassword: String!) {
    UserChangePassword(input: { 
      password: $password,
      oldPassword: $oldPassword
    }) {
      error
    }
  } 
`

export const FORGET_PASSWORD = gql`
  mutation FORGET_PASSWORD($email: String!) {
    UserForgetPassword(input: { email: $email }) {
      error
      token
    }
  } 
`

export const ANSWER_QUESTION = gql`
  mutation ANSWER_QUESTION($userId: String!, $questionId: String!) {
    AnswerAdd(input: { userId: $userId, questionId: $questionId }) {
      error
      answerEdge {
        node {
          _id
        }
      }
    }
  }
`

export const ADD_POINTS = gql`
  mutation ADD_POINTS($userId: String!, $action: String!) {
    PointAdd(input: { 
      userId: $userId, 
      action: $action
    }) {
      error
      userEdge {
        node {
          _id
        }
      }
    }
  }
`

export const CHANGE_PICTURE = gql`
  mutation CHANGE_PICTURE($picture: String!) {
    UserChangePicture(input: {
      picture: $picture,
    }) {
      error
      me {
        name
        picture
      }
    }
  }
`

export const ADD_CPF = gql`
  mutation ADD_CPF($cpf: String!) {
    UserChangeCpf(input: { 
      cpf: $cpf, 
    }) {
      error
      me {
        cpf
      }
    }
  }
`

export const USER_PUSH_TOKEN = gql`
  mutation USER_PUSH_TOKEN(
    $os: String!, 
    $token: String!
  ) {
    UserPushTokenAdd(input: { 
      os: $os, 
      token: $token, 
    }) {
      error
      token
    }
  }
`