import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';

import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Track Time',
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 1,
  //   userScalable: false,
  // },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <Toaster />
        <Providers>
          <div className="flex flex-col min-h-[100dvh]">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
