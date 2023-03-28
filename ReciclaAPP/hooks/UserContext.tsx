import * as React from 'react'
import { client } from '../services/apollo';
import { PROFILE_QUERY } from '../graphql/queries';

interface User {
  id: string
  _id: string
  name: string
}

interface UserState {
  user?: User
  loggingIn: boolean
}

interface UserContext {
  userState: UserState
  setUserState: (userState: UserState) => void
  getUser: () => void
  signUp: (args: {
    name: string
    picture: string
    email: string
    password: string
    isLandlord: boolean
  }) => void
  logIn: (email: string, password: string, isLandlord: boolean) => void
  logOut: () => void
}

const initialState = { user: undefined, loggingIn: true }

export const UserContext = React.createContext<UserContext>({
  userState: initialState,
  setUserState: () => {},
  getUser: () => {},
  signUp: () => {},
  logIn: () => {},
  logOut: () => {},
})

export const UserProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = React.useState<UserState>(initialState)

  const getUser = async () => {
    let user: any = null

    try {
      // user = await accountsGraphQL.getUser()
      user = await client.query({
        query: PROFILE_QUERY
      })

      console.log('!!!user', user)
    } catch (error) {
      console.error('There was an error logging in.', error)
    } finally {
      setUserState({ user: user && { ...user, _id: user.id }, loggingIn: false })
    }
  }

  const logIn = async (email: string, password: string) => {
    // await accountsPassword.login({ password, user: { email } })
    // await getUser()
  }

  const signUp = async (args: {
    name: string
    picture: string
    email: string
    password: string
    isLandlord: boolean
  }) => {
    const { name, picture, email, password } = args
    // await accountsPassword.createUser({
    //   password,
    //   email,
    //   profile: { name, picture },
    // })
    // await logIn(email, password)
  }

  const logOut = async () => {
    // await accountsGraphQL.logout()
    setUserState({ user: undefined, loggingIn: false })
  }

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
        getUser,
        signUp,
        logIn,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)