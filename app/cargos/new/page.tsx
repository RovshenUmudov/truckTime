import { FC } from 'react';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Content from '@/app/cargos/new/Content';
import PageTitle from '@/components/ui/Title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cargo - New',
};

const NewCargo: FC = () => (
  <>
    <Header />
    <Container>
      <Banner src="/new-cargo-banner.jpg" />
      <div className="max-w-[700px] mb-5">
        <PageTitle title="Create new cargo" />
        <Content />
      </div>
    </Container>
  </>
);

export default NewCargo;
