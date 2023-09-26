'use client';

import { FC, useTransition } from 'react';
import { IUserMe } from '@/types';
import { postProfile } from '@/app/profile/requests';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import PageTitle from '@/components/ui/Title';
import { useRouter } from 'next/navigation';
import ProfileForm from '@/components/Forms/ProfileForm';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';

interface IProfileContent {
  user: IUserMe;
}

const ProfileContent: FC<IProfileContent> = ({ user }) => {
  const { error, success } = useNotify();
  const { data: session, update } = useSession();
  const router = useRouter();
  const { handleUnsavedChanges } = useContextUnsavedChanges();
  const [, startTransition] = useTransition();

  const handleSubmit = async (values: Partial<IUserMe>, setSubmitting: (isSubmitting: boolean) => void) => {
    const res = await postProfile(values, session?.tokens?.access.token || '');

    setSubmitting(false);

    if (res.error) {
      error(res.error.message);

      return;
    }

    await update({ user: res.data, outdatedCache: true });

    handleUnsavedChanges(false);
    startTransition(() => router.refresh());
    success('Profile updated successfully');
  };

  return (
    <div className="max-w-[700px] mb-5">
      <PageTitle title="Profile" />
      <ProfileForm initialValues={user} handleSubmit={handleSubmit} />
    </div>
  );
};

export default ProfileContent;
