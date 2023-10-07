'use client';

import { FC, useTransition } from 'react';
import CargoForm from '@/components/Forms/CargoForm';
import { EnumCargoType, ICargo } from '@/types';
import { useSession } from 'next-auth/react';
import useNotify from '@/hooks/notify';
import moment from 'moment';
import { splitTimeStr } from '@/utils';
import { useRouter } from 'next/navigation';
import { createCargo } from '@/app/cargos/requests';

interface INewCargoContent {
  averageSpeed: number;
}

const NewCargoContent: FC<INewCargoContent> = ({ averageSpeed }) => {
  const { data: session } = useSession();
  const { error, success } = useNotify();
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

    const res = await createCargo(newValues, session?.tokens?.access.token || '');

    setSubmitting(false);

    if (res.error) {
      error(res.error.message);

      return;
    }

    success('New cargo created successfully');
    startTransition(() => { router.refresh(); router.push('/'); });
  };

  return (
    <CargoForm handleSubmit={handleSubmit} averageSpeed={averageSpeed} />
  );
};

export default NewCargoContent;
