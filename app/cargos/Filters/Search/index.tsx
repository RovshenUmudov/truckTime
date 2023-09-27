'use client';

import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CargosSearch: FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const searchBounce = setTimeout(() => {
      if (search.length >= 3 || search === '') {
        router.push(`/cargos/${search.length ? `?search=${search}` : ''}`);
      }
    }, 500);

    return () => clearTimeout(searchBounce);
  }, [search]);

  return (
    <Input
      name="search"
      placeholder="Search"
      label="Search"
      icon={<Search className="w-4 h-4" />}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default CargosSearch;
