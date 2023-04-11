'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const toast = useToast()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const _signIn = async (event: React.FormEvent) => {

    event.preventDefault()
    if (!email || !password) return;
    // todo
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: callbackUrl || '/',
      })
      setEmail('')
      setPassword('')

      // toast({
      //   title: 'Added to the subscribe list.',
      //   description: "Logado",
      //   status: 'success',
      //   duration: 9000,
      //   isClosable: true,
      // })
      
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <TextField
          label="Email address"
          id="email"
          name="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required />
        <TextField
          label="Password"
          id="password"
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required />
      </div>
      <Button 
        type="submit" 
        color="cyan" 
        className="mt-8 w-full"
        disabled={!email || !password}
        onClick={(event) => _signIn(event)}
      >
        Sign in to account
      </Button>
      <Button 
        type="submit" 
        color="cyan" 
        className="mt-8 w-full"
        onClick={() => signIn("google")}
      >
        Enter with google
      </Button>
    </>
  )
}
