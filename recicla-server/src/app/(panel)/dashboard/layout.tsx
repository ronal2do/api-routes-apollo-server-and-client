import '../../globals.css';

import { Inter } from 'next/font/google';
import LayoutWrapper from './LayoutWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html className={`${inter.className} h-full bg-gray-100 antialiased`} lang="en">
      <body className="flex h-full flex-col">
        {session == null ? (
          <div>nothing</div>
        ) : (
        <LayoutWrapper session={session}>
          {children}
        </LayoutWrapper>
        )}
      </body>
    </html>
  );
}