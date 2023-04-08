import Link from 'next/link'

import { AuthLayout } from '../../../../components/AuthLayout'
import { Button } from '../../../../components/Button'
import { SelectField, TextField } from '../../../../components/Fields'
import { ROUTES } from '../../../../config'
import { SignUpForm } from './SingUpForm'

export default function Login() {
  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href={ROUTES.signin} className="text-cyan-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  )
}
