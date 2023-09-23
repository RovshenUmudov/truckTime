'use client';

import { Hourglass } from 'lucide-react';
import { FC } from 'react';
import Link from 'next/link';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';
import useNotify from '@/hooks/notify';
import { useRouter } from 'next/navigation';

interface IMainLogo {
    darkMode?: boolean;
}

const MainLogo: FC<IMainLogo> = ({ darkMode = false }) => {
  const { unsavedChanges, handleUnsavedChanges } = useContextUnsavedChanges();
  const { confirm } = useNotify();
  const router = useRouter();

  return (
    <div className={`relative z-30 ${darkMode ? 'text-primary' : ''}`}>
      <Link
        href="/"
        onClickCapture={(e) => {
          if (unsavedChanges) {
            e.preventDefault();

            confirm(() => {
              handleUnsavedChanges(false);
              router.push('/');
            });
          }
        }}
        className="flex items-center text-lg font-medium"
      >
        <Hourglass className="mr-2" />
        Track Time
      </Link>
    </div>
  );
};

export default MainLogo;