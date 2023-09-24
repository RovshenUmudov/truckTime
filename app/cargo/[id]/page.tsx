import { FC } from 'react';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Content from '@/app/cargo/[id]/Content';
import { IParams } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';
import { getCargoById } from '@/app/cargo/[id]/requests';

const SingleCargo: FC<IParams> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const cargo = await getCargoById(params.id, session?.tokens?.access.token || '');

  return (
    <>
      <Header />
      <Container>
        <Banner src="/single-cargo.jpg" />
        <div className="max-w-[700px] mt-5">
          <h2 className="text-3xl font-bold mb-5">Edit cargo</h2>
          <Content data={cargo.data || null} />
        </div>
      </Container>
    </>
  );
};

export default SingleCargo;
