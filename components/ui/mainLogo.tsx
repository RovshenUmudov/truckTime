import { Hourglass } from 'lucide-react';
import { FC } from 'react';
import Link from 'next/link';

interface IMainLogo {
    darkMode?: boolean;
}

const MainLogo: FC<IMainLogo> = ({ darkMode = false }) => (
  <div className={`relative z-30 ${darkMode ? 'text-primary' : ''}`}>
    <Link href="/" className="flex items-center text-lg font-medium">
      <Hourglass className="mr-2" />
      Track Time
    </Link>
  </div>
);

export default MainLogo;
