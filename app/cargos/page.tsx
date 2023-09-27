import { FC } from 'react';
import Container from '@/components/Container';
import Banner from '@/components/Banner';
import { Metadata } from 'next';
import AllCargosFilters from '@/app/cargos/Filters';
import { IMetadataParams } from '@/types';
import CargoList from '@/components/CargoList';

export const metadata: Metadata = {
  title: 'Cargo transportation - List',
};

const Cargos: FC<IMetadataParams> = async ({ searchParams }) => (
  <Container>
    <Banner src="/banner-all-cargo.jpg" />
    <AllCargosFilters />
    <CargoList title="All cargo transportation" searchParams={searchParams} />
  </Container>
);

export default Cargos;
