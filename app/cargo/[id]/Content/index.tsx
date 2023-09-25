'use client';

import { FC, useTransition } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { ICargo } from '@/types';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import moment from 'moment';
import { splitTimeStr } from '@/utils';
import { deleteCargo, updateCargoById } from '@/app/cargo/[id]/requests';
import { useRouter } from 'next/navigation';

interface IEditCargoContent {
  data: ICargo | null;
}

const EditCargoContent: FC<IEditCargoContent> = ({ data }) => {
  const { data: session } = useSession();
  const { error, success, confirm } = useNotify();
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

    if (res.error) {
      error(res.error.message);

      return;
    }

    success('Updated successfully');
    startTransition(() => { router.refresh(); router.push('/'); });
  };

  const deleteHandler = async () => {
    const res = await deleteCargo(session?.tokens?.access.token || '', data?._id || '');

    if (res.error) {
      error(res.error.message);

      return;
    }

    success('Deleted successfully');
    startTransition(() => { router.refresh(); router.push('/'); });
  };

  const handleDelete = () => {
    confirm(deleteHandler, 'Delete confirmation', 'Are you sure you want to delete cargo?', 'Delete');
  };

  return (
    <CargoForm
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      initialValues={data || undefined}
    />
  );
};

export default EditCargoContent;
