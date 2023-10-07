'use client';

import { FC, useTransition } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { EnumCargoType, ICargo } from '@/types';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import moment from 'moment';
import { splitTimeStr } from '@/utils';
import { deleteCargo, updateCargoById } from '@/app/cargos/requests';
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
      unloadDate: values.type === EnumCargoType.multiple ? '' : moment(values.unloadDate).set(unloadTime).format(),
      unloadTime: values.type === EnumCargoType.multiple ? '00:00' : values.unloadTime,
      multipleUnload: values.type === EnumCargoType.single ? [] : values.multipleUnload,
      eightHoursRest: Number(values.eightHoursRest),
      weekendHours: Number(values.weekendHours || 0),
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
