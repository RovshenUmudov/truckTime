'use client';

import { FC } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { ICargoValues } from '@/types';
import { fetchAPI } from '@/utils/fetch';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import moment from 'moment';
import { splitTimeStr } from '@/utils';

const NewCargoContent: FC = () => {
  const { error, success } = useNotify();
  const { data: session } = useSession();
  const handleSubmit = async (values: ICargoValues, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log('handleSubmit', values);

    const startTime = splitTimeStr(values.startTime || '');
    const unloadTime = splitTimeStr(values.unloadTime || '');

    const newValues: ICargoValues = {
      ...values,
      startDate: moment(values.startDate).set(startTime).format(),
      unloadDate: moment(values.unloadDate).set(unloadTime).format(),
    };

    const res = await fetchAPI('/cargo/new', undefined, {
      method: 'POST',
      accessToken: session?.tokens?.access.token || '',
      body: newValues,
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
