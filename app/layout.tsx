import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';

import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Track Time',
};

export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
