'use client';

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';

interface IConfirmationContextProps {
    handleUnsavedChanges: (isUnsaved: boolean) => void;
    unsavedChanges: boolean;
}

const defaultValue: IConfirmationContextProps = {
  handleUnsavedChanges: () => undefined,
  unsavedChanges: false,
};

export const UnsavedChangesContext = createContext<IConfirmationContextProps>(defaultValue);

const UnsavedChangesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  const handleUnsavedChanges = (isUnsaved: boolean) => setUnsavedChanges(isUnsaved);

  useEffect(() => {
    if (unsavedChanges) {
      handleUnsavedChanges(false);
    }
  }, [pathname]);

  return (
    <UnsavedChangesContext.Provider value={{ handleUnsavedChanges, unsavedChanges }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
};

export default UnsavedChangesProvider;

export const useContextUnsavedChanges = () => useContext(UnsavedChangesContext);
