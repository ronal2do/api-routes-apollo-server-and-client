'use client'

import { Button } from '../../../../components/Button'
import { SelectField, TextField } from '../../../../components/Fields'
import { FormEvent, useState } from 'react'
import { useRegisterUserWithEmail } from '../../../../hooks'

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const toast = useToast()

  const { registerUserWithEmail, data, loading, error } = useRegisterUserWithEmail()
  const _signUp = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      console.warn('fileds invaluid')
      // toast({
      //   title: 'Added to the subscribe list.',
      //   description: "We've created your account for you.",
      //   status: 'error',
      //   duration: 9000,
      //   isClosable: true,
      // })
      return
    }

    const variables = {
      name: lastName ? `${name} ${lastName}` : name,
      email,
      password
    }

    try {
      registerUserWithEmail({
        variables
      })

      if (data?.registerUserWithEmail.error || error) {
        // toast({
        //   title: 'Email ja registrado',
        //   status: 'error',
        //   duration: 9000,
        //   isClosable: true,
        // })
        console.warn('error invaluid', data?.registerUserWithEmail.error)
        console.warn('error error', error)

      }

      // toast({
      //   title: 'Added to the subscribe list.',
      //   description: "Registrado",
      //   status: 'success',
      //   duration: 9000,
      //   isClosable: true,
      // })

      // TODO login and redirect

    } catch (error) {
      console.log('error', error)
      // toast({
      //   title: 'Added to the subscribe list.',
      //   description: error.messsage,
      //   status: 'error',
      //   duration: 9000,
      //   isClosable: true,
      // })
    } finally {
      setEmail('')
      setName('')
      setLastName('')
      setPassword('')
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <TextField
          label="First name"
          id="name"
          name="name"
          type="text"
          value={name} 
          onChange={(event) => setName(event.target.value)}
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          id="last_name"
          name="last_name"
          type="text"
          value={lastName} 
          onChange={(event) => setLastName(event.target.value)}
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Email address"
          id="email"
          name="email"
          value={email} 
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          className="col-span-full"
          label="Password"
          id="password"
          name="password"
          value={password}
          type={showPassword ? 'text' : 'password'} 
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <SelectField
          className="col-span-full"
          label="How did you hear about us?"
          id="referral-source"
          name="referral_source"
        >
          <option>AltaVista search</option>
          <option>Super Bowl commercial</option>
          <option>Our route 34 city bus ad</option>
          <option>The “Never Use This” podcast</option>
        </SelectField>
      </div>
      <Button
        loading={loading}
        disabled={!name || !email || !password}
        onClick={(e) => _signUp(e)}
        color="cyan" className="mt-8 w-full">
        Get started today
      </Button>
    </>
  )
}
