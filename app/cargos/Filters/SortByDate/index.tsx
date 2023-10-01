'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import InputSelect from '@/components/ui/InputSelect';
import { IOption } from '@/types';

enum EnumCargoOrder {
    'ASC'= 'ASC',
    'DESC' = 'DESC',
}

const optionsList: IOption[] = [
  { label: 'Newest', value: EnumCargoOrder.ASC },
  { label: 'Oldest', value: EnumCargoOrder.DESC },
];

const SortCargosByDate: FC = () => {
  const router = useRouter();

  const handleChange = (value: string) => {
    router.push(`/cargos/${value.length ? `?sort=${value}` : ''}`);
  };

  return (
    <InputSelect
      name="sort"
      label="Sort"
      placeholder="Sort"
      options={optionsList}
      handleChange={handleChange}
      defaultValue="ASC"
    />
  );
};

export default SortCargosByDate;
