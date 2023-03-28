import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { ROUTES } from "../../../config";
import { prisma } from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      async authorize(credentials) {
        console.log({credentials})
        if  (!credentials?.email || !credentials?.password) {
          throw new Error('empty fields')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          throw new Error('user not found')
        }

        const checkPass = await compare(credentials.password, user.hashedPassword as string)

        if (!checkPass) {
          throw new Error('Incorred password')
        }

        return user
      },
      credentials: {
        email: {
          label: "Email",
          type: "text"
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      }
    }),
  ],
  pages: {
    signIn: ROUTES.signin,
    newUser: ROUTES.singup
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)