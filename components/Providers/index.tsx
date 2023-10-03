'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import UnsavedChangesProvider from '@/context/unsavedChanges';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <SessionProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <UnsavedChangesProvider>
          {children}
        </UnsavedChangesProvider>
      </TooltipProvider>
    </ThemeProvider>
  </SessionProvider>
);

export default Providers;
