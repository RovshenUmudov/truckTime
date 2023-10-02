'use client';

import { FC } from 'react';
import InputSelect from '@/components/ui/InputSelect';
import { EnumCargoType, IOption } from '@/types';
import { IFilters } from '@/app/cargos/Filters';
import useQueryString from '@/hooks/queryString';

const optionsList: IOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Single', value: EnumCargoType.single },
  { label: 'Multiple', value: EnumCargoType.multiple },
];

const FilterCargosByType: FC<IFilters> = ({ className = '' }) => {
  const { updateQuery } = useQueryString();

  const handleChange = (value: string) => updateQuery('type', value);

  return (
    <InputSelect
      name="type"
      label="Type"
      placeholder="Select type"
      options={optionsList}
      className={className}
      handleChange={handleChange}
    />
  );
};

export default FilterCargosByType;
