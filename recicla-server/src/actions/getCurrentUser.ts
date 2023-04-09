
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../pages/api/auth/[...nextauth]"
import {prisma} from "../lib/prisma";

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    console.log('session', session)
    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if(!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser?.emailVerified?.toISOString(),
    }
  } catch (error) {
    return null
  }
}