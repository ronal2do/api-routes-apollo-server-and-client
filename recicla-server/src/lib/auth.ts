import { prisma } from "./prisma";
import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";

const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6dwadatwti788DuiODUxMyIsImlhdCI6MTUwMzY5MTE0Mn0.s9kO0HoPZpskzNsstF7Eer504DUC5r1MY6qjSFu_8eM'

export async function getUser(token: string) {
  if (!token) return null;
  try {
    const decodedToken: any = jwt.verify(token.substring(4), jwtSecret);
    const user: User | null = await prisma.user.findUnique({
       where: {
        id: decodedToken.id 
       }
    });

    if (!user) return null;

    return user;
  } catch (err) {
    return null;
  }
}

export function generateToken(id: string) {
  return `JWT ${jwt.sign({ id }, jwtSecret)}`;
}