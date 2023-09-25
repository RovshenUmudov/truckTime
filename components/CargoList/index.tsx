import { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';
import { getCargos } from '@/components/CargoList/requests';
import CargoItem from '@/components/CargoList/Item';
import PageTitle from '@/components/ui/Title';
import LinkButton from '@/components/ui/LinkButton';

interface ICargoList {
    limit?: number;
    title: string;
}

const CargoList: FC<ICargoList> = async ({ title, limit }) => {
  const session = await getServerSession(authOptions);
  const cargos = await getCargos(session?.tokens?.access.token || '', limit);

  return (
    <>
      <PageTitle title={title} />
      <div className="grid gap-5 grid-cols-3 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        {cargos.data?.map((cargo) => <CargoItem data={cargo} key={crypto.randomUUID()} />)}
      </div>
      {cargos.data && limit && cargos.data.length > limit ? (
        <div className="flex justify-center my-5">
          <LinkButton href="/cargos" label="View All" />
        </div>
      ) : null}
    </>
  );
};

export default CargoList;
