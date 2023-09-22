'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { ICredentials } from '@/types';
import { signIn } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import AuthForm from '@/components/Forms/Auth';

const LoginContent: FC = () => {
  const router = useRouter();
  const { error } = useNotify();

  const handleSubmit = async (values: ICredentials, setSubmitting: (isSubmitting: boolean) => void) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/',
    });

    setSubmitting(false);

    if (res?.error) {
      return error(res.error);
    }

    router.refresh();

    return new Promise((resolve) => {
      router.replace(res?.url || '/');
      resolve('Success');
    }).then(() => router.refresh());
  };

  return (
    <AuthForm handleSubmit={handleSubmit} />
  );
};

export default LoginContent;
