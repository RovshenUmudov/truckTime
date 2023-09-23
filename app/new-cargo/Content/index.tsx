'use client';

import { FC } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { ICargoValues } from '@/types';
import { fetchAPI } from '@/utils/fetch';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';

const NewCargoContent: FC = () => {
  const { error, success } = useNotify();
  const { data: session } = useSession();
  const handleSubmit = async (values: ICargoValues, setSubmitting: (isSubmitting: boolean) => void) => {
    const res = await fetchAPI('/cargo/new', undefined, {
      method: 'POST',
      accessToken: session?.tokens?.access.token || '',
      body: values,
    });

    setSubmitting(false);

    if (res.error) {
      error(res.error.message);

      return;
    }

    success('New cargo created successfully');
  };

  return (
    <CargoForm handleSubmit={handleSubmit} />
  );
};

export default NewCargoContent;
