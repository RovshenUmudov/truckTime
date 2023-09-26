import { FC } from 'react';
import Container from '@/components/Container';
import Banner from '@/components/Banner';
import CargoList from '@/components/CargoList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cargo transportation - List',
};

const Cargos: FC = () => (
  <Container>
    <Banner src="/banner-all-cargo.jpg" />
    <CargoList title="All cargo transportation" />
  </Container>
);

export default Cargos;
