'use client';

import { FC } from 'react';
import InputSelect from '@/components/ui/InputSelect';
import { IOption } from '@/types';
import { IFilters } from '@/app/cargos/Filters';
import useQueryString from '@/hooks/queryString';

enum EnumCargoOrder {
    'ASC'= 'ASC',
    'DESC' = 'DESC',
}

const optionsList: IOption[] = [
  { label: 'Newest', value: EnumCargoOrder.ASC },
  { label: 'Oldest', value: EnumCargoOrder.DESC },
];

const SortCargosByDate: FC<IFilters> = ({ className = '' }) => {
  const { updateQuery } = useQueryString();

  const handleChange = (value: string) => updateQuery('sort', value);

  return (
    <InputSelect
      name="sort"
      label="Sort"
      className={className}
      placeholder="Sort"
      options={optionsList}
      handleChange={handleChange}
      defaultValue={EnumCargoOrder.ASC}
    />
  );
};

export default SortCargosByDate;
