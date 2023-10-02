import { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';
import CargoItem from '@/components/CargoList/Item';
import PageTitle from '@/components/ui/Title';
import LinkButton from '@/components/ui/LinkButton';
import { clsx } from 'clsx';
import { getCargos } from '@/app/cargos/requests';
import { IMetadataParams } from '@/types';

interface ICargoList {
    limit?: number;
    title: string;
    className?:string;
    searchParams?: IMetadataParams['searchParams'];
}

const CargoList: FC<ICargoList> = async ({
  title,
  searchParams,
  limit,
  className = '',
}) => {
  const session = await getServerSession(authOptions);
  const cargos = await getCargos(
    session?.tokens?.access.token || '',
    { ...searchParams, limit: limit ? limit.toString() : '' },
  );

  if (!cargos.data?.data) {
    return null;
  }

  return (
    <div className={clsx('mb-5', className)}>
      <PageTitle title={title} />
      <div className="grid gap-5 grid-cols-3 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        {cargos.data.data.map((cargo) => <CargoItem key={crypto.randomUUID()} data={cargo} />)}
      </div>
      {cargos.data.total && limit && cargos.data.total > limit ? (
        <div className="flex justify-center mt-5">
          <LinkButton href="/cargos" label="View All" />
        </div>
      ) : null}
    </div>
  );
};

export default CargoList;
