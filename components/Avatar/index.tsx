'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const UserAvatar: FC = () => {
  const { data: session } = useSession();

  return (
    <Avatar className="w-14 h-14">
      <AvatarImage src={session?.user?.imageURL || ''} alt="user avatar" />
      <AvatarFallback className="text-xl">{session?.user?.email?.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
