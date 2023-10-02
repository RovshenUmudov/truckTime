'use client';

import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { IFilters } from '@/app/cargos/Filters';
import useQueryString from '@/hooks/queryString';

const CargosSearch: FC<IFilters> = ({ className = '' }) => {
  const { updateQuery } = useQueryString();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const searchBounce = setTimeout(() => {
      if (search.length >= 3 || search === '') {
        updateQuery('search', search);
      }
    }, 500);

    return () => clearTimeout(searchBounce);
  }, [search]);

  return (
    <div className={className}>
      <Input
        name="search"
        placeholder="Search"
        label="Search"
        icon={<Search className="w-4 h-4" />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default CargosSearch;
