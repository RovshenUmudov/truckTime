import { FC } from 'react';
import MainLogo from '@/components/ui/Logo';
import HeaderProfile from '@/components/Header/Profile';
import ThemeToggle from '@/components/ThemeToggle';

const Header: FC = () => (
  <div className="py-5 max-[1600px]:py-5 max-[768px]:p-2 max-[768px]:px-4 border-b px-10 flex z-50
  items-center justify-between"
  >
    <MainLogo />
    <div className="grid gap-5 items-center grid-cols-2">
      <ThemeToggle />
      <HeaderProfile />
    </div>
  </div>
);

export default Header;
