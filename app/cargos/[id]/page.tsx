import { FC } from 'react';
import Banner from '@/components/Banner';
import Container from '@/components/Container';
import Content from '@/app/cargos/[id]/Content';
import { IParams } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';
import { getCargoById } from '@/app/cargos/requests';
import PageTitle from '@/components/ui/Title';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cargo transportation - Edit',
};

const SingleCargo: FC<IParams> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const cargo = await getCargoById(params.id, session?.tokens?.access.token || '');

  if (!cargo.data) redirect('/');

  return (
    <Container>
      <Banner src="/single-cargo.jpg" />
      <div className="max-w-[768px] mb-5">
        <PageTitle title="Edit cargo transportation" />
        <Content data={cargo.data || null} />
      </div>
    </Container>
  );
};

export default SingleCargo;
