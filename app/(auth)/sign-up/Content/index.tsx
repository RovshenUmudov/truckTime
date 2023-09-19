'use client';

import { FC, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ICredentials, ITokens } from '@/types';
import { fetchAPI } from '@/utils/fetch';
import AuthForm from '@/components/Form';
import useNotify from '@/hooks/notify';

const SignUpContent: FC = () => {
  const { data, update } = useSession();
  const router = useRouter();
  const { error, success } = useNotify();

  useEffect(() => {
    if (data?.error) {
      update({ ...data, error: null });
    }
  }, [data]);

  const handleSubmit = async (values: ICredentials, setSubmitting: (isSubmitting: boolean) => void) => {
    const res = await fetchAPI<ITokens, undefined, ICredentials>(
      'auth/sign-up/email',
      undefined,
      { method: 'POST', body: values },
    );

    setSubmitting(false);

    if (res?.error) {
      return error(res.error.message);
    }

    if (res.data?.access.token) {
      await signIn('credentials', {
        tokens: JSON.stringify(res.data),
        redirect: false,
        callbackUrl: '/',
      });
    }

    success('User was created');

    return router.replace('/');
  };

  return (
    <AuthForm handleSubmit={handleSubmit} />
  );
};

export default SignUpContent;
