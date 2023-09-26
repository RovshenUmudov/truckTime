import { FC } from 'react';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Content from '@/app/cargos/new/Content';
import PageTitle from '@/components/ui/Title';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';

export const metadata: Metadata = {
  title: 'Cargo transportation - New',
};

const NewCargo: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <Container>
        <Banner src="/new-cargo-banner.jpg" />
        <div className="max-w-[700px] mb-5">
          <PageTitle title="Create new cargo transportation" />
          <Content averageSpeed={session?.user?.averageSpeed || 77} />
        </div>
      </Container>
    </>
  );
};

export default NewCargo;
