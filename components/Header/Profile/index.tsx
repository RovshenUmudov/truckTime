'use client';

import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/Avatar';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const HeaderProfile: FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent focus-visible:!outline-0 h-auto"
        style={{ boxShadow: 'none !important' }}
      >
        <UserAvatar />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-55" align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href="/profile" className="flex">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link
          href="/"
          className="flex"
          onClick={(e) => {
            e.preventDefault();
            signOut({ redirect: true, callbackUrl: '/login' });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default HeaderProfile;
