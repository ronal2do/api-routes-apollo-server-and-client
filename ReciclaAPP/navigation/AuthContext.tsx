import React from 'react';

export interface AuthContextType {
  signIn: (token: string) => void;
  signOut: () => void;
  signUp: (token: string) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

