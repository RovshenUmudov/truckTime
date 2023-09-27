import { FC } from 'react';
import CargosSearch from '@/app/cargos/Filters/Search';
import SortCargosByDate from '@/app/cargos/Filters/SortByDate';

const AllCargosFilters: FC = () => (
  <div className="rounded-md border p-5 mb-5 grid justify-start gap-5 grid-cols-[300px_180px]
  max-[565px]:grid-cols-1 max-[768px]:mb-4"
  >
    <CargosSearch />
    <SortCargosByDate />
  </div>

);

export default AllCargosFilters;
