'use client';

import { FC, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

enum EnumCargoOrder {
    'ASC'= 'ASC',
    'DESC' = 'DESC',
}

const SortCargosByDate: FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<EnumCargoOrder>(EnumCargoOrder.ASC);

  useEffect(() => {
    router.push(`/cargos/${selected.length ? `?sort=${selected}` : ''}`);
  }, [selected]);

  return (
    <div>
      <Label>Sort</Label>
      <Select onValueChange={(e) => setSelected(e as EnumCargoOrder)} defaultValue={EnumCargoOrder.ASC}>
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EnumCargoOrder.ASC}>Newest</SelectItem>
          <SelectItem value={EnumCargoOrder.DESC}>Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortCargosByDate;
