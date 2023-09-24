'use client';

import { FC, useTransition } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { ICargo } from '@/types';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import moment from 'moment';
import { splitTimeStr } from '@/utils';
import { updateCargoById } from '@/app/cargo/[id]/requests';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';
import { useRouter } from 'next/navigation';

interface IEditCargoContent {
  data: ICargo | null;
}

const EditCargoContent: FC<IEditCargoContent> = ({ data }) => {
  const { data: session } = useSession();
  const { handleUnsavedChanges } = useContextUnsavedChanges();
  const { error, success } = useNotify();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const handleSubmit = async (values: ICargo, setSubmitting: (isSubmitting: boolean) => void) => {
    const startTime = splitTimeStr(values.startTime || '');
    const unloadTime = splitTimeStr(values.unloadTime || '');

    const newValues: ICargo = {
      ...values,
      startDate: moment(values.startDate).set(startTime).format(),
      unloadDate: moment(values.unloadDate).set(unloadTime).format(),
    };

    const res = await updateCargoById(session?.tokens?.access.token || '', newValues);

    setSubmitting(false);
    handleUnsavedChanges(false);

    if (res.error) {
      error(res.error.message);

      return;
    }

    success('Updated successfully');
    startTransition(() => { router.refresh(); router.push('/'); });
  };

  return (
    <CargoForm handleSubmit={handleSubmit} initialValues={data || undefined} />
  );
};

export default EditCargoContent;
