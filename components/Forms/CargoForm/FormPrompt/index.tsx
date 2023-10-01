'use client';

import { FC, useMemo } from 'react';
import { ICargo } from '@/types';
import Prompt from '@/components/Prompt';
import { beatifyTime } from '@/utils';
import { AlertCircle } from 'lucide-react';

interface ICargoFormPrompt {
  data: Partial<ICargo> | null;
}

const CargoFormPrompt: FC<ICargoFormPrompt> = ({ data }) => {
  const description = useMemo(() => {
    if (!data?.remainingTime || !data.driving) return '';

    if (!data.remainingTime.totalInSeconds || data.remainingTime.totalInSeconds < 0) {
      return `You not enough time: ${beatifyTime(data.remainingTime)}`;
    }

    if (data.remainingTime.totalInSeconds || data.remainingTime.totalInSeconds > 0) {
      return `You have enough time: ${beatifyTime(data.remainingTime)}`;
    }

    return beatifyTime(data.remainingTime);
  }, [data?.remainingTime, data?.driving]);

  if (!data?.remainingTime
    || !data.driving
    || data.remainingTime.totalInSeconds === undefined) {
    return null;
  }

  return (
    <Prompt
      variant={data.remainingTime.totalInSeconds < 0 ? 'destructive' : 'default'}
      description={description}
      icon={<AlertCircle className="h-4 w-4" />}
    />
  );
};

export default CargoFormPrompt;
