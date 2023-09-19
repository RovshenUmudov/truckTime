'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import UnsavedChangesProvider from '@/context/unsavedChanges';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <SessionProvider>
    <UnsavedChangesProvider>
      {children}
    </UnsavedChangesProvider>
  </SessionProvider>
);

export default Providers;
