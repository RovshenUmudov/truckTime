import { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';
import { getCargos } from '@/components/CargoList/requests';
import CargoItem from '@/components/CargoList/Item';
import PageTitle from '@/components/ui/Title';

const CargoList: FC = async () => {
  const session = await getServerSession(authOptions);
  const cargos = await getCargos(session?.tokens?.access.token || '');

  return (
    <>
      <PageTitle title="Recent cargo transportation" />
      <div className="grid gap-5 grid-cols-3 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        {cargos.data?.map((cargo) => <CargoItem data={cargo} key={crypto.randomUUID()} />)}
      </div>
    </>
  );
};

export default CargoList;
