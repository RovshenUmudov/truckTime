import { FC } from 'react';
import CargoItem from '@/components/CargoList/Content/Item';
import { getCargos } from '@/components/CargoList/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';

const CargosContent: FC = async () => {
  const session = await getServerSession(authOptions);
  const cargos = await getCargos(session?.tokens?.access.token || '');

  return (
    <div className="grid gap-5  grid-cols-3 max-[768px]:grid-cols-1">
      {cargos.data?.map((cargo) => <CargoItem data={cargo} key={crypto.randomUUID()} />)}
    </div>
  );
};

export default CargosContent;
