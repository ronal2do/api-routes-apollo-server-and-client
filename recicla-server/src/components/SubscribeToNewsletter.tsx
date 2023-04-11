'use client'

import { useState } from "react";
import { useCreateNewsletter } from '../hooks/graphql/useCreateNewsletter';
import { TextField } from './Fields';
import { Button } from "./Button";

export const SubscribeToNewsletter: React.FunctionComponent<{}> = () => {
  const [inputEmail, setInputEmail] = useState('')
  const {createNewsletterEntry, data, loading, error } = useCreateNewsletter()

  const onSubmit = async () => {
    if (!inputEmail) return;
    try {
      createNewsletterEntry({
        variables: {
          email: inputEmail
        }
      })

      if (data?.createNewsletterEntry.error || error) {
        return {
          error: "algo deu errado"
        }
      }

      setInputEmail('')
    } catch (error) {
      console.log("on submit error", error)
    }
  }

  return (
    <div className="flex w-full justify-center md:w-auto">
      <TextField
        type="email"
        id="email"
        aria-label="Email address"
        placeholder={'john@doe.net'}
        autoComplete="email"
        required
        value={inputEmail}
        onChange={(event) => setInputEmail(event.target.value)}
        className="w-60 min-w-0 shrink" />
      <Button 
        loading={loading}
        onClick={onSubmit}
        type="submit" color="orange" className="ml-4 flex-none"
      >
        <span className="hidden lg:inline">Join our newsletter</span>
        <span className="lg:hidden">Join newsletter</span>
      </Button>
    </div>
  )
};
