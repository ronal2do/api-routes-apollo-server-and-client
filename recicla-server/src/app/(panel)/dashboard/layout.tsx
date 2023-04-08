import '../../globals.css';

import { Inter } from 'next/font/google';
import LayoutWrapper from './LayoutWrapper';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.className} h-full bg-gray-100 antialiased`} lang="en">
      <body className="flex h-full flex-col">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}