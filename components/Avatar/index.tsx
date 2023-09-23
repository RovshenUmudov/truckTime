'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const UserAvatar: FC = () => {
  const { data: session } = useSession();

  return (
    <Avatar className="w-14 h-14 max-[768px]:w-10 max-[768px]:h-10">
      <AvatarImage src={session?.user?.imageURL || ''} alt="user avatar" />
      <AvatarFallback className="text-xl max-[768px]:text-[14px]">
        {session?.user?.email?.slice(0, 1).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
