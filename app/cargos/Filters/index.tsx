import { FC } from 'react';
import CargosSearch from '@/app/cargos/Filters/Search';
import SortCargosByDate from '@/app/cargos/Filters/SortByDate';
import FilterCargosByType from '@/app/cargos/Filters/FilterByType';

export interface IFilters {
  className?: string;
}

const AllCargosFilters: FC = () => (
  <div className="rounded-md border p-5 mb-5 justify-start flex flex-wrap gap-5 max-[768px]:mb-4">
    <CargosSearch className="w-[300px] max-[781px]:w-[180px] max-[655px]:w-full" />
    <SortCargosByDate className="w-[180px] max-[655px]:w-full" />
    <FilterCargosByType className="w-[180px] max-[655px]:w-full" />
  </div>

);

export default AllCargosFilters;
