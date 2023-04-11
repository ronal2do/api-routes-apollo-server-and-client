import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { LoginForm } from './LoginForm'
import { ROUTES } from '@/config'

export default async function Login() {
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href={ROUTES.singup} className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
