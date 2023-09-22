'use client';

import { FC } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { asyncDelay } from '@/utils';
import { ICargoValues } from '@/types';

const NewCargoContent: FC = () => {
  const handleSubmit = async (values: ICargoValues, setSubmitting: (isSubmitting: boolean) => void) => {
    await asyncDelay(2000);

    console.log(values);

    setSubmitting(false);
  };

  return (
    <CargoForm handleSubmit={handleSubmit} />
  );
};

export default NewCargoContent;
