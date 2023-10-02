'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import UnsavedChangesProvider from '@/context/unsavedChanges';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <SessionProvider>
    <TooltipProvider>
      <UnsavedChangesProvider>
        {children}
      </UnsavedChangesProvider>
    </TooltipProvider>
  </SessionProvider>
);

export default Providers;
