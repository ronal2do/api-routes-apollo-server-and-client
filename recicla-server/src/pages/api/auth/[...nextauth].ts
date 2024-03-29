import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { ROUTES } from "@/config";
import { prisma } from "@/lib/prisma";
import { JWT, encode } from 'next-auth/jwt';

const session = async function session(params: { session: Session; user: User; token: JWT }) {
  const encodedToken = await encode({token: params.token, secret: process.env.NEXTAUTH_SECRET as string});
  // @ts-ignore
  params.session.token = encodedToken;
  return params.session;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      async authorize(credentials) {
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
        console.log('user', user)
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
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      return token
    },
    async session(params: { session: Session; user: User; token: JWT }) {
      const encodedToken = await encode({token: params.token, secret: process.env.NEXTAUTH_SECRET as string});
      return params.session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}

export default NextAuth(authOptions)